const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const { stripe } = require("../utils");
const { Axios } = require("axios");

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

  res.status(200).json({
    receiverName: user.name,
    message: "Account verification successful",
  });
});

// ! Get user transactions (3)
const getUserTransactions = asyncHandler(async (req, res) => {
  /* >> Check if a user is logged in */
  // if (req.user.email !== req.body.email) {
  //   res.status(400);
  //   throw new Error("Not authorized top view the transaction.");
  // }

  const transactions = await Transaction.find({
    $or: [{ sender: req.user.email }, { receiver: req.user.email }],
  })
    .sort({ createdAt: -1 })
    .populate("sender")
    .populate("receiver");

  res.status(200).json(transactions);
});

// ! Deposit Fund Stripe (4)
const depositFundStripe = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const user = await User.findById(req.user._id);

  /* >> Create stripe customer */
  if (!user.stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email,
    });
    user.stripeCustomerId = customer.id;
    user.save();
  }

  /* >> Create Stripe Session */
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "nzd",
          product_data: {
            name: "Keipy wallet deposit...",
            description: `Make a deposit of $${amount} to your Keipy wallet...`,
          },
          unit_amount:
            amount * 100 /* we need 100 because the amount is in cents */,
        },
        quantity: 1,
      },
    ],

    customer: user.stripeCustomerId,
    success_url: `${process.env.FRONTEND_URL}/wallet?payment=successful&amount=${amount}`,
    cancel_url: `${process.env.FRONTEND_URL}/wallet?payment=failed`,
  });

  // console.log(session);

  /* >> session is an object that contains some properties, one of them is the URL */
  return res.json(session);
});

// ! Deposit Fund function is outside because also needed deposit the money for flutterwave payment.
const depositFund = async (customer, data, description, source) => {
  await Transaction.create({
    amount:
      source === "stripe" ? data.amount_subtotal / 100 : data.amount_subtotal,
    sender: "Self",
    receiver: customer.email,
    description: description,
    status: "success",
  });

  /* Increase sender account's balance */
  await User.findOneAndUpdate(
    {
      email: customer.email,
    },
    {
      $inc: {
        balance:
          source === "stripe"
            ? data.amount_subtotal / 100
            : data.amount_subtotal,
      },
    }
  );
};

// ! Stripe webhook (5)
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const webhook = asyncHandler(async (req, res) => {
  const sig = request.headers["stripe-signature"];

  let data;
  let event;
  let eventType;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("Webhook verified");
  } catch (err) {
    console.log("Webhook error", err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  data = event.data.object;
  eventType = event.type;

  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        /* >> Deposit funds into customer account */
        const description = "Stripe Deposit";
        const source = "stripe";
        depositFund(customer, data, description, source);
      })
      .catch((err) => console.log(err.message));
  }

  res.send().end();
});

// ! Flutterwave (6)
const depositFundFLW = asyncHandler(async (req, res) => {
  const { transaction_id } = req.query;

  /* >> Confirm transaction */
  const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

  const response = await Axios({
    url,
    method: "get",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: process.env.FLW_SECRET_KEY /* The key is not yet exist! */,
    },
  });

  console.log(response.data);
  const { tx_ref, amount, customer } = response.data.data;
  const successURL = process.env.FRONTEND_URL + `/wallet?payment=successful`;
  const failureURL = process.env.FRONTEND_URL + `/wallet?payment=failed`;

  if (req.query.status === "successful") {
    /* >> Deposit money in user's wallet */
    const data = {
      amount_subtotal: amount,
    };
    const description = "Flutterwave Deposit";
    const source = "flutterwave";
    depositFund(customer, data, description, source);

    res.redirect(successURL);
  } else {
    res.redirect(failureURL);
  }
});

module.exports = {
  transferFund,
  verifyAccount,
  getUserTransactions,
  depositFundStripe,
  webhook,
  depositFundFLW,
};
