const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const { calculateTotalPrice, updateProductQuantity } = require("../utils");
const Product = require("../models/productModel");
const sendEmail = require("../utils/sendEmail");
const { orderSuccessEmail } = require("../emailTemplates/orderTemplate");
const { Axios } = require("axios");
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ! Create the order (1)
const createOrder = asyncHandler(async (req, res) => {
  /* this pieces of information are coming from the frontend */
  const {
    orderDate,
    orderTime,
    orderAmount,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod,
    coupon,
  } = req.body;

  /* >> Validation */
  if (!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
    res.status(400);
    throw new Error("Order data missing!!!");
  }

  /* >> Create the order - we don't send the order to the frontend */
  await Order.create({
    user: req.user._id,
    orderDate,
    orderTime,
    orderAmount,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod,
    coupon,
  });

  /* >> Update the product quantity */
  await updateProductQuantity(cartItems);

  /* >> Send an order email to the user */
  const subject = "New Order Placed - Keipy Shop";
  const send_to = req.user.email;
  const template = orderSuccessEmail(req.user.name, cartItems);
  const reply_to = "no_reply@keipy.com";

  await sendEmail(subject, send_to, template, reply_to);
  /* ===================================== */

  res.status(201).json({ message: "Order Created" });
});

// ! Get orders (2)
const getOrders = asyncHandler(async (req, res) => {
  let orders;

  /* only admin could see all orders */
  if (req.user.role === "admin") {
    orders = await Order.find().sort("-createdAt");
    return res.status(200).json(orders);
  }

  /* a regular user could only see an order they created */
  orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  return res.status(200).json(orders);
});

// ! Get a single order (3)
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // * FOR ADMIN
  if (req.user.role === "admin") {
    return res.status(200).json(order);
  }

  // * If the order is not match the user id
  if (order.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(order);
});

// ! Update order status (4)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;
  const { id } = req.params;

  const order = await Order.findById(id);

  // * Validation
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // * Update the order status
  await Order.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      orderStatus: orderStatus,
    },
    {
      new: true,
      runValidators: true /* Ensuring all of validations will run while we updating */,
    }
  );

  res.status(200).json({ message: "Order Status Updated" });
});

// ! Pay with stripe (5)
const payWithStripe = asyncHandler(async (req, res) => {
  const { items, shipping, description, coupon } = req.body;

  const products = await Product.find();

  let orderAmount;
  orderAmount = calculateTotalPrice(products, items);

  if (coupon !== null && coupon?.name !== "nil") {
    let TotalAfterDiscount =
      orderAmount - (orderAmount * coupon.discount) / 100;
    orderAmount = TotalAfterDiscount;
  }

  const paymentIntent = await Stripe.paymentIntents.create({
    amount: orderAmount,
    currency: "nzd",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postal_code,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
    /* // TODO: go to Stripe website and set up the `receipt_email: customerEmail` */
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// ! Verify FLW Payment
const verifyFlwPayment = asyncHandler(async (req, res) => {
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
  const { tx_ref } = response.data.data;
  const successURL =
    process.env.FRONTEND_URL +
    `/checkout-flutterwave?payment=successful&ref${tx_ref}`;
  const failureURL =
    process.env.FRONTEND_URL + `/checkout-flutterwave?payment=failed`;

  if (req.query.status === "successful") {
    res.redirect(successURL);
  } else {
    res.redirect(failureURL);
  }
});

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  payWithStripe,
  verifyFlwPayment,
};
