// ! CRUD (Create, Read, Update, Delete) operation for the product(s)
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { mongoose } = require("mongoose");

const createProduct = asyncHandler(async (req, res) => {
  // res.send("Correct"); /* for testing in insomnia */
  const {
    name,
    sku,
    category,
    brand,
    quantity,
    price,
    description,
    image,
    regularPrice,
    color,
  } = req.body; /* these are the data from the frontend */

  if (!name || !category || !brand || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // ! Create the product body (1)
  const product = await Product.create({
    name,
    sku,
    category,
    brand,
    quantity,
    price,
    description,
    image,
    regularPrice,
    color,
  });

  res.status(201).json(product); /* sending back to the user that created it */
});

// ! get Products (2)
const getProducts = asyncHandler(async (req, res) => {
  // res.send("Correct");
  const products = await Product.find().sort("-createdAt");
  res.status(200).json(products); /* sending back to the user that created it */
});

// ! get single product (3)
const singleProduct = asyncHandler(async (req, res) => {
  // res.send("Correct");
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found.");
  } else {
    res
      .status(200)
      .json(product); /* sending back to the user that created it */
  }
});

// ! delete a product (4)
const deleteProduct = asyncHandler(async (req, res) => {
  // res.send("Correct");
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found.");
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "The product is deleted." });
});

// ! update the product (5)
const updateProduct = asyncHandler(async (req, res) => {
  // res.send("Correct");
  const {
    name,
    category,
    brand,
    quantity,
    price,
    description,
    image,
    regularPrice,
    color,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found.");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name,
      category,
      brand,
      quantity,
      description,
      image,
      regularPrice,
      price,
      color,
    },
    {
      /* Ensuring the properties of a product that have "required keyword" will be checked */
      new: true,
      runValidators: true,
    }
  );

  res
    .status(200) /* 200 means "OK" */
    .json(
      updatedProduct
    ); /* we use json() to display the information to the frontend */
});

// ! Review the product (6)
const reviewProduct = asyncHandler(async (req, res) => {
  // res.send("Correct");
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;

  // * Validation
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add a star and review");
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // * Update Rating
  product.ratings.push({
    star,
    review,
    reviewDate,
    name: req.user.name,
    userID: req.user._id,
  });

  product.save();
  res.status(200).json({ message: "Product review is added." });
});

// ! Delete the review (7)
const deleteReview = asyncHandler(async (req, res) => {
  // * only the user that is created the review that can delete that review, OTHERS cannot delete it.
  const { userID } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found.");
  }

  // * update a new rating
  const newRatings = product.ratings.filter((rating) => {
    return rating.userID.toString() !== userID.toString();
  });

  product.ratings = newRatings;
  product.save();
  res.status(200).json({ message: "Product review is deleted." });
});

// !  Update the review (8)
const updateReview = asyncHandler(async (req, res) => {
  const { star, review, reviewDate, userID } = req.body;
  const { id } = req.params;

  // * Validation
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add a star and review");
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // * Another validation - Match the user to its user's review (the one who created the review).
  if (req.user._id.toString() !== userID) {
    res.status(401); /* 401 means "for AUTHORIZATION" */
    throw new Error("User is not authorized");
  }

  // * Update product review - we need "product ID" and the" user ID"
  const updatedReview = await Product.findOneAndUpdate(
    {
      _id: product._id,
      "ratings.userID": new mongoose.Types.ObjectId(userID),
    },
    {
      $set: {
        "ratings.$.star": star,
        "ratings.$.review": review,
        "ratings.$.reviewDate": reviewDate,
      },
    }
  );

  if (updatedReview) {
    res.status(200).json({ message: "The product review is updated." });
  } else {
    res.status(400).json({ message: "The Product review is NOT updated." });
  }
});

module.exports = {
  createProduct,
  getProducts,
  singleProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
};
