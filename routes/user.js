const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
require("dotenv").config();

// Twilio package
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const User = require("../models/User");

// Sign up
router.post("/signup", async (req, res) => {
  console.log("01");
  const { email, username, password } = req.fields;
  try {
    const userEmail = await User.findOne({ "account.email": email });
    console.log(userEmail);

    res.json(userEmail);

    // if (!userEmail) {
    //   if (email && username && password) {
    //     const token = uid2(64);
    //     const salt = uid2(64);
    //     const hash = SHA256(password + salt).toString(encBase64);

    //     const newUser = new User({
    //       token,
    //       salt,
    //       hash,
    //       account: {
    //         email,
    //         username,
    //       },
    //     });

    //     await newUser.save();

    //     client.messages.create({
    //       body: `${username} - ${email} registered on the To-Do List Application`,
    //       from: "+15028920406",
    //       to: "+33631520339",
    //     });

    //     res.json({
    //       _id: newUser._id,
    //       token: newUser.token,
    //       email: newUser.account.email,
    //       username: newUser.account.username,
    //     });
    // } else {
    //   res.status(400).json({ error: "Missing parameters" });
    //   // }
    // } else {
    //   res.status(409).json({ error: "This email already has an account." });
    // }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sign in
router.post("/signin", async (req, res) => {
  const { email, password } = req.fields;
  try {
    if (password && email) {
      const user = await User.findOne({
        "account.email": email,
      });
      if (user) {
        if (SHA256(password + user.salt).toString(encBase64) === user.hash) {
          res.json({
            _id: user._id,
            token: user.token,
            email: user.account.email,
            username: user.account.username,
          });
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      res.status(400).json({ error: "Missing parameters" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
