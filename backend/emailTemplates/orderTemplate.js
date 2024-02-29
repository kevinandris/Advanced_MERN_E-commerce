const orderSuccessEmail = (name, cartItems) => {
  const email = {
    body: {
      name,
      intro: "Your order has been placed successfully.",
      table: {
        data: cartItems.map((item) => {
          return {
            product: item.name,
            price: `${item.price}`,
            quantity: item.cartQuantity,
            total: `${item.price * item.cartQuantity}`,
          };
        }),
        columns: {
          customWidth: {
            product: "40%",
          },
        },
      },
      action: {
        instructions:
          "You can check the status of your order and more in your dashboard:",
        button: {
          color: "#3869D4",
          text: "Go to Dashboard",
          link: "https://keipy.com",
        },
      },
      outro: "Thank you for purchasing our products, have a wonderful day! :)",
    },
  };

  return email;
};

module.exports = {
  orderSuccessEmail,
};
