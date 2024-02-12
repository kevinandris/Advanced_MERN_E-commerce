// -- 3 --
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken"); /* create  a token and we can send it to the frontend */
const bcrypt = require("bcryptjs"); /* encrypt or hash our password */
const User = require("../models/userModel");

// ! generate a token that will sign the user in
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

// ! Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // * validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  // * Check if user exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  // * Create new User
  const user = await User.create({
    name,
    email,
    password,
  });

  // * Generate Token
  const token = generateToken(user._id);

  // * Send the token to the frontend
  if (user) {
    /* send the user details without the password */
    const { _id, name, email, role } = user;

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      /* // ! in development mode, comment out those 2, error might occur if we try to login */
      // secure: true,
      // sameSite: none,
    });

    // Send user data
    res.status(201).json({
      _id,
      name,
      email,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.send("Register User...");
});

module.exports = {
  registerUser,
};
