const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/createCategory", protect, adminOnly, createCategory);
router.get("/getCategories", protect, adminOnly, getCategories);
router.delete("/:slug", protect, adminOnly, deleteCategory);

module.exports = router;
