import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Cart from "../../src/pages/cart/Cart";
test("Displays empty cart message", () => {
  render(<Cart />);
  const emptyCartMessage = screen.getByText("Your cart is empty.");
  expect(emptyCartMessage).toBeInTheDocument();
});

test("Displays cart items", () => {
  render(<Cart />);
  const cartItems = screen.getAllByRole("row");
  expect(cartItems.length).toBeGreaterThan(0);
});

test("Increase product quantity in cart", () => {
  render(<Cart />);
  const increaseButton = screen.getAllByText("+")[0];
  fireEvent.click(increaseButton);
  const cartTotalQuantity = screen.getByText(/Cart item\(s\): \d+/);
  const cartTotalAmount = screen.getByText(/\$[\d.]+/);
  expect(cartTotalQuantity).toHaveTextContent("Cart item(s): 1");
  expect(cartTotalAmount).toHaveTextContent("$");
});

test("Decrease product quantity in cart", () => {
  render(<Cart />);
  const decreaseButton = screen.getAllByText("-")[0];
  fireEvent.click(decreaseButton);
  const cartTotalQuantity = screen.getByText(/Cart item\(s\): \d+/);
  const cartTotalAmount = screen.getByText(/\$[\d.]+/);
  expect(cartTotalQuantity).toHaveTextContent("Cart item(s): 0");
  expect(cartTotalAmount).toHaveTextContent("$");
});
