import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductDetails from "../../../../src/components/product/productDetails/ProductDetails";

test("Displays product details", () => {
  render(<ProductDetails />);
  expect(screen.getByText("Product Details")).toBeInTheDocument();
  expect(screen.getByText("Back To Product")).toBeInTheDocument();
  expect(screen.getByText("Price:")).toBeInTheDocument();
  expect(screen.getByText("SKU:")).toBeInTheDocument();
  expect(screen.getByText("Category:")).toBeInTheDocument();
  expect(screen.getByText("Brand:")).toBeInTheDocument();
  expect(screen.getByText("Color:")).toBeInTheDocument();
  expect(screen.getByText("Quantity in Stock:")).toBeInTheDocument();
  expect(screen.getByText("Sold:")).toBeInTheDocument();
});

test("Adds product to cart", () => {
  render(<ProductDetails />);
  const addToCartButton = screen.getByText("+");
  fireEvent.click(addToCartButton);
  // Add assertions to check if the product is added to the cart correctly
});

test("Slides through images automatically", () => {
  render(<ProductDetails />);
  // Add assertions to check if the images are automatically sliding
});

test("Adds product to cart", () => {
  render(<ProductDetails />);
  const addToCartButton = screen.getByText("+");
  fireEvent.click(addToCartButton);
  // Add assertions to check if the product is added to the cart correctly
});
