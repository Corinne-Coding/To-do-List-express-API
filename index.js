const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidableMiddleware());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const userRoutes = require("./routes/user");
const boardRoutes = require("./routes/board");
const taskRoutes = require("./routes/task");
app.use(userRoutes);
app.use(boardRoutes);
app.use(taskRoutes);

console.log("index.js");

app.get("/", (req, res) => {
  res.json({ message: "Welcome on my To-do List API." });
});

app.all("*", function (req, res) {
  res.status(404).json({ message: "Not found" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started");
});
