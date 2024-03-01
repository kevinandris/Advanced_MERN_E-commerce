const Product = require("../models/productModel");

// ! STRIPE SECRET KEY (1)
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ! Calculate total price (2)
const calculateTotalPrice = (products, cartItems) => {
  let totalPrice = 0;

  cartItems.forEach(function (cartItem) {
    const product = products.find(function (product) {
      return product._id?.toString() === cartItem._id;
    });

    if (product) {
      const quantity = cartItem.cartQuantity;
      const price = parseFloat(product.price);
      totalPrice += quantity * price;
    }
  });

  return totalPrice * 100;
};

// ! update product quantity (3)
const updateProductQuantity = async (cartItems) => {
  let bulkOption = cartItems.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: {
          $inc: {
            quantity: -product.cartQuantity,
            sold: +product.cartQuantity,
          },
        },
      },
    };
  });
  await Product.bulkWrite(bulkOption, {});
};

module.exports = {
  calculateTotalPrice,
  updateProductQuantity,
  stripe,
};
