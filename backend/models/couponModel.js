// -- 2 --
const mongoose = require("mongoose");

// ! The body of the coupon properties
const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
      required: [true, "Name is required"],
      minlength: [6, "Coupon must be up to 6 characters"],
      maxlength: [32, "Coupon must be more than 12 characters"],
    },
    discount: {
      type: Number,
      required: true,
    },
    expiresAt: {
      // type: String,
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
