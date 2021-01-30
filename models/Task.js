const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  title: { type: String, required: true },
  date: Date,
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
  done: { type: Boolean, default: false },
});

module.exports = Task;
