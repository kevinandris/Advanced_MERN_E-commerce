const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// ! protecting the route - that will get the details of users if they are logged in
const protect = asyncHandler(async (req, res, next) => {
  try {
    // * access the cookie
    const token = req.cookies.token;

    if (!token) {
      res.send(401);
      throw new Error("Not authorized, please login");
    }

    // * Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // * get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

// ! function that will handle the admin only
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = {
  protect,
  adminOnly,
};
