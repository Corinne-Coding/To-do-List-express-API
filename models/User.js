const mongoose = require("mongoose");

const User = mongoose.model("User", {
  account: {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  boardsId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
  ],
  token: String,
  salt: String,
  hash: String,
});

module.exports = User;
