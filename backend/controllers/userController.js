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

// ! (1) Register User - POST method
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
      /* // * in development mode, comment out those 2, error might occur if we try to login */
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

// ! (2) Login User - POST method
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // * Validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add an email and a password");
  }

  // * Check if user exists
  const user = await User.findOne({ email });

  // * if a user is not exist
  if (!user) {
    res.status(400);
    throw new Error("User does not exist.");
  }

  // * Check if user password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // * Generate Token
  const token = generateToken(user._id);

  // * log the user in
  if (user && passwordIsCorrect) {
    const newUser = await User.findOne({ email }).select(
      "-password"
    ); /* // ? remove the password to the frontend */
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      /* // ! in development mode, comment out those 2, error might occur if we try to login */
      // secure: true,
      // sameSite: "none",
    });

    // Send user data
    res.status(201).json(newUser);
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  res.send("Login user...");
});

// ! (3) Logout user - get method
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    /* // ! in development mode, comment out those 2, error might occur if we try to login */
    // secure: true,
    // sameSite: "none",
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

module.exports = {
  registerUser,
  loginUser,
  logout,
};
