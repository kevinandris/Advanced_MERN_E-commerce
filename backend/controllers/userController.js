// -- 3 --
const asyncHandler = require("express-async-handler");

// ! Register User
const registerUser = asyncHandler(async (req, res) => {
  res.send("Register User...");
});

module.exports = {
  registerUser,
};
