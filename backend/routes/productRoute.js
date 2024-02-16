// -- 3 --
const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { createProduct } = require("../controllers/productController");

router.post("/", protect, adminOnly, createProduct);
    
module.exports = router;
