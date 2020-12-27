const mongoose = require("mongoose");

const Board = mongoose.model("Board", {
  title: { type: String, required: true },
  date: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tasksId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

module.exports = Board;
