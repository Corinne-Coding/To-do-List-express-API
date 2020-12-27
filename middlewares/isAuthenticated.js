const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const user = await User.findOne({
        token: req.headers.authorization.replace("Bearer ", ""),
      });
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        req.user = user;
        return next();
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
