const express = require("express");
const router = express.Router();

const Board = require("../models/Board");
const User = require("../models/User");

const isAuthenticated = require("../middlewares/isAuthenticated");

// CREATE BOARD
router.post("/create/board", isAuthenticated, (req, res) => {
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
      newBoard.save();

      // update user
      let boardsArray = user.boardsId;
      boardsArray.push(newBoard._id);
      user.save();

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
    const user = req.user;
    const userToFind = await User.findById(user._id).populate("boardsId");

    res.json(userToFind.boardsId);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
