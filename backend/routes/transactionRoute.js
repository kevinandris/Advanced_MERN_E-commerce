const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  transferFund,
  verifyAccount,
  getUserTransactions,
} = require("../controllers/transactionController");

router.post("/transferFund", express.json(), protect, transferFund);
router.post("/verifyAccount", express.json(), protect, verifyAccount);
router.get(
  "/getUserTransactions",
  express.json(),
  protect,
  getUserTransactions
);

module.exports = router;
