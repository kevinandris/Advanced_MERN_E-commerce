// -- 2 --
const mongoose = require("mongoose");

// ! The body of the product properties
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    /* SKU stands for "Stock Keeping Unit" */
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Please add a brand"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Please add a color"],
      default: "As seen",
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
      trim: true,
    },
    regularPrice: {
      type: Number,
      // required: [true, "Please add a price"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    image: {
      type: [String],
    },
    ratings: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  } /* this will display the object's date that was created */
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
