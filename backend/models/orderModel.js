// -- 2 --
const mongoose = require("mongoose");

// ! The body of the order properties
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
      ref: "User",
    },
    orderDate: {
      type: String,
      required: [true, "Please add an order date"],
      trim: true,
    },
    orderTime: {
      type: String,
      required: [true, "Please add an order date"],
      trim: true,
    },
    orderAmount: {
      type: String,
      required: [true, "Please add an order amount"],
      trim: true,
    },
    orderStatus: {
      type: String,
      required: [true, "Please add an order status"],
      trim: true,
    },
    paymentMethod: {
      type: String,
      trim: true,
    },
    cartItems: {
      type: [Object],
      required: [true],
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    coupon: {
      type: Object,
      required: true,
      default: {
        name: "nil",
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
