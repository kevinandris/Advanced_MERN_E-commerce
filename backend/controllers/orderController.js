const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

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

  // * Validation
  if (!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
    res.status(400);
    throw new Error("Order data missing!!!");
  }

  // * Create the order - we don't send the order to the frontend
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

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
};
