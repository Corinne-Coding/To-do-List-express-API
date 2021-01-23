const express = require("express");
const router = express.Router();

const Board = require("../models/Board");
const User = require("../models/User");

const isAuthenticated = require("../middlewares/isAuthenticated");

// CREATE BOARD
router.post("/create/board", isAuthenticated, async (req, res) => {
  const { title } = req.fields;
  try {
    if (title) {
      const user = req.user;

      // new Board
      const newBoard = new Board({
        title,
        userId: user._id,
        date: new Date(),
      });
      await newBoard.save();

      // update user
      let boardsArray = user.boardsId;
      boardsArray.push(newBoard._id);
      await user.save();

      res.json(newBoard);
    } else {
      res.status(400).json({ error: "Missing title" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/boards", isAuthenticated, async (req, res) => {
  try {
    const { user } = req;
    const { date } = req.query;

    const sort = { date: "asc" };
    if (date === "desc") {
      sort.date = date;
    }

    const userBoards = await User.findById(user._id).populate({
      path: "boardsId",
      options: { sort: sort },
    });

    res.json(userBoards.boardsId);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.put("/update/board/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { title } = req.fields;

  try {
    if (title) {
      const boardToUpdate = await Board.findById(id);
      if (title === boardToUpdate.title) {
        res.json(boardToUpdate);
      } else {
        await boardToUpdate.updateOne({ title: title });
        res.json({ message: "Board successfully updated" });
      }
    } else {
      res.status(400).json({ error: "Missing title" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/board/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await Board.findByIdAndDelete(id);
    res.json({ message: "Board successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
