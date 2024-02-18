const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const slugify = require("slugify");
const Brand = require("../models/brandModel");

// ! (1) Create a brand
const createBrand = asyncHandler(async (req, res) => {
  // res.send("Correct");
  const { name, category } = req.body;

  // * Validation - checking the name
  if (!name || !category) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // * checking if a category exists in the database to avoid duplicate info
  const categoryExists = await Category.findOne({ name: category });

  if (!categoryExists) {
    /* 400 means bad request response */
    res.status(400);
    throw new Error("Parent Category not found.");
  }

  const brand = await Brand.create({
    name,
    slug: slugify(name),
    category,
  });
  /* 201 for creating something new */
  res.status(201).json(brand);
});

// ! (2) Get brands
const getBrands = asyncHandler(async (req, res) => {
  // res.send("Correct");
  const brands = await Brand.find().sort("-createdAt");
  res.status(200).json(brands); /* sending back to the user that created it */
});

// ! (3) delete a brand
const deleteBrand = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const brand = await Brand.findOneAndDelete({ slug });

  // * Validation - if there is no brand
  if (!brand) {
    res.status(404);
    throw new Error("Brand not found");
  }

  res.status(200).json({ message: "Brand Deleted." });
});

module.exports = {
  createBrand,
  getBrands,
  deleteBrand,
};
