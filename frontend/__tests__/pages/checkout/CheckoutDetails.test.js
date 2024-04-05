import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CheckoutDetails from "../../../src/pages/checkout/CheckoutDetails";

test("Displays correct order details", () => {
  const order = {
    id: 1,
    items: [
      { id: 1, name: "Item 1", price: 10 },
      { id: 2, name: "Item 2", price: 20 },
    ],
    total: 30,
  };
  render(<CheckoutDetails order={order} />);
  expect(screen.getByText("Order ID: 1")).toBeInTheDocument();
  expect(screen.getByText("Item 1 - $10")).toBeInTheDocument();
  expect(screen.getByText("Item 2 - $20")).toBeInTheDocument();
  expect(screen.getByText("Total: $30")).toBeInTheDocument();
});

test("Handles empty order", () => {
  const order = {
    id: null,
    items: [],
    total: 0,
  };
  render(<CheckoutDetails order={order} />);
  expect(screen.getByText("No order details available")).toBeInTheDocument();
});

test("Renders elements in Home component", () => {
  render(<Home />);
  expect(screen.getByText("Element 1")).toBeInTheDocument();
  expect(screen.getByText("Element 2")).toBeInTheDocument();
  expect(screen.getByText("Element 3")).toBeInTheDocument();
});

test("Handles invalid order object", () => {
  const order = {
    id: null,
    items: [],
    total: 0,
  };
  render(<CheckoutDetails order={order} />);
  expect(screen.getByText("Invalid order")).toBeInTheDocument();
});
