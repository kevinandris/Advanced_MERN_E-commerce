const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { createCategory } = require("../controllers/categoryController");
const router = express.Router();

// routes
router.post("/createCategory", protect, adminOnly, createCategory);

module.exports = router;
