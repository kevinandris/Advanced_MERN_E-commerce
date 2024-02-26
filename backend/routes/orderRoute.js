const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  payWithStripe,
} = require("../controllers/orderController");

// ! Routes
router.post("/", protect, createOrder);

router.get("/", protect, getOrders);
router.get("/:id", protect, getOrder);

router.patch("/:id", protect, adminOnly, updateOrderStatus);

router.post("/create-payment-intent", payWithStripe);

module.exports = router;
