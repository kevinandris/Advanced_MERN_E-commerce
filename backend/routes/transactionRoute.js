const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  transferFund,
  verifyAccount,
  getUserTransactions,
  depositFundStripe,
  webhook,
  depositFundFLW,
} = require("../controllers/transactionController");

router.post("/transferFund", express.json(), protect, transferFund);
router.post("/verifyAccount", express.json(), protect, verifyAccount);
router.get(
  "/getUserTransactions",
  express.json(),
  protect,
  getUserTransactions
);
router.post("/depositFundStripe", express.json(), protect, depositFundStripe);
router.get("/depositFundFLW", express.json(), protect, depositFundFLW);
router.post("/webhook", express.raw({ type: "application/json" }), webhook);

module.exports = router;
