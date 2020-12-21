const mongoose = require("mongoose");

const Board = mongoose.model("Board", {
  title: { type: String, required: true },
  date: new Date(),
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  tasks: { type: Array, default: [] },
});

module.exports = Board;
