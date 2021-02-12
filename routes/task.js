const express = require("express");
const router = express.Router();

const Board = require("../models/Board");
const Task = require("../models/Task");

const isAuthenticated = require("../middlewares/isAuthenticated");

// add task in DB
router.post("/create/task", isAuthenticated, async (req, res) => {
  const { title, boardId } = req.fields;

  try {
    if (title && boardId) {
      // new Task
      const newTask = new Task({
        title,
        boardId,
        date: new Date(),
      });
      await newTask.save();

      // update board
      let board = await Board.findById(boardId);
      board.tasksId.push(newTask._id);
      await board.save();

      res.json({ message: "Task successfully created" });
    } else {
      res.status(400).json({ error: "Missing parameters" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tasks
router.get("/tasks/:boardId", isAuthenticated, async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findById(boardId);

    const tasks = await Task.find({ _id: { $in: board.tasksId } });

    const obj = { todo: [], done: [] };
    tasks.map((task) => {
      if (task.done) {
        obj.done.push(task);
      } else {
        obj.todo.push(task);
      }
    });

    res.json(obj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update task
router.put("/update/task/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { title, done } = req.fields;

  try {
    if (title || done === false || done === true) {
      const taskToUpdate = await Task.findById(id);

      if (title) {
        if (title === taskToUpdate.title) {
          res.json({ message: "Task successfully updated" });
        } else {
          await taskToUpdate.updateOne({ title: title });
          res.json({ message: "Task successfully updated" });
        }
      } else if (done === true || done === false) {
        if (done === taskToUpdate.done) {
          res.json({ message: "Task successfully updated" });
        } else {
          await taskToUpdate.updateOne({ done: done });
          res.json({ message: "Task successfully updated" });
        }
      }
    } else {
      res.status(400).json({ error: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete task
router.delete("/delete/task/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const taskToDelete = await Task.findByIdAndDelete(id);
    if (taskToDelete) {
      // update tasksId array in board
      const boardToUpdate = await Board.findOne({ tasksId: { $in: id } });
      boardToUpdate.tasksId.pull(id);
      await boardToUpdate.save();
      res.json({ message: "Task successfully deleted" });
    } else {
      res.status(400).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
