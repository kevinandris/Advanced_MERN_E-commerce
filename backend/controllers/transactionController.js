const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

// ! Transfer the fund (1)
const transferFund = asyncHandler(async (req, res) => {
  const { amount, sender, receiver, description, status } = req.body;

  /* >> Validation */
  if (!amount || !sender || !receiver) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  /* >> Check sender account */
  const user = await User.findOne({ email: sender });
  if (user.balance < amount) {
    res.status(400);
    throw new Error("Insufficient balance");
  }

  /* Decrease sender account's balance */
  await User.findOneAndUpdate(
    {
      email: sender,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );

  /* Increase sender account's balance */
  await User.findOneAndUpdate(
    {
      email: receiver,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  );

  /* >> Save Transaction */
  await Transaction.create(req.body);

  res.status(200).json({ message: "Transaction successful" });
});

// ! Verify Account (2)
const verifyAccount = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.receiver });

  if (!user) {
    res.status(400);
    throw new Error("Your account is not exist!");
  }

  res.status(200).json({ message: "Account verification successful" });
});

// ! Get user transactions (3)
const getUserTransactions = asyncHandler(async (req, res) => {
  /* >> Check if a user is logged in */
  if (req.user.email !== req.body.email) {
    res.status(400);
    throw new Error("Not authorized top view the transaction.");
  }

  const transactions = await Transaction.find({
    $or: [{ sender: req.body.email }, { receiver: req.body.email }],
  })
    .sort({ createdAt: -1 })
    .populate("sender")
    .populate("receiver");

  res.status(200).json(transactions);
});

module.exports = {
  transferFund,
  verifyAccount,
  getUserTransactions,
};
