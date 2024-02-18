const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const slugify = require("slugify");

// ! Create a category (1)
const createCategory = asyncHandler(async (req, res) => {
  // res.send("Correct");
  const { name } = req.body;

  // * Validation - checking the name
  if (!name) {
    res.status(400);
    throw new Error("Please fill in category name");
  }

  // * checking if a category exists in the database to avoid duplicate info
  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    /* 400 means bad request response */
    res.status(400);
    throw new Error("Category name already exists.");
  }

  const category = await Category.create({
    name,
    slug: slugify(name),
  });
  /* 201 for creating something new */
  res.status(201).json(category);
});

// !  get categories (2)
const getCategories = asyncHandler(async (req, res) => {
  // res.send("Correct");
  const categories = await Category.find().sort("-createdAt");
  res
    .status(200)
    .json(categories); /* sending back to the user that created it */
});

// ! delete a category (3)
const deleteCategory = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const category = await Category.findOneAndDelete({ slug });

  // * Validation - if there is no category
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.status(200).json({ message: "Category Deleted." });
});

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
};
