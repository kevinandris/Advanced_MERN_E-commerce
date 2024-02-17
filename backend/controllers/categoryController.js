const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  res.send("Correct");
});

module.exports = {
  createCategory,
};
