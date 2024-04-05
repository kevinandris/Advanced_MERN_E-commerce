import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CheckoutSummary from "../../../../src/components/checkout/checkoutSummary/CheckoutSummary";

test("asd", () => {
  render(<CheckoutSummary />);
});

test("Displays correct order summary", () => {
  const order = {
    items: [
      { name: "Item 1", price: 10 },
      { name: "Item 2", price: 20 },
      { name: "Item 3", price: 30 },
    ],
    total: 60,
  };
  render(<CheckoutSummary order={order} />);
  expect(screen.getByText("Item 1")).toBeInTheDocument();
  expect(screen.getByText("Item 2")).toBeInTheDocument();
  expect(screen.getByText("Item 3")).toBeInTheDocument();
  expect(screen.getByText("$60")).toBeInTheDocument();
});

test("Displays message when no items in order", () => {
  const order = {
    items: [],
    total: 0,
  };
  render(<CheckoutSummary order={order} />);
  expect(screen.getByText("No items in order")).toBeInTheDocument();
});

test("Displays correct quantity for each item in order", () => {
  const order = {
    items: [
      { name: "Item 1", quantity: 2 },
      { name: "Item 2", quantity: 3 },
      { name: "Item 3", quantity: 1 },
    ],
    total: 0,
  };
  render(<CheckoutSummary order={order} />);
  expect(screen.getByText("Item 1 (2)")).toBeInTheDocument();
  expect(screen.getByText("Item 2 (3)")).toBeInTheDocument();
  expect(screen.getByText("Item 3 (1)")).toBeInTheDocument();
});

test("Displays all items in the order without crashing", () => {
  const order = {
    items: [
      { name: "Item 1", quantity: 1 },
      { name: "Item 2", quantity: 1 },
      { name: "Item 3", quantity: 1 },
      { name: "Item 4", quantity: 1 },
      { name: "Item 5", quantity: 1 },
      { name: "Item 6", quantity: 1 },
      { name: "Item 7", quantity: 1 },
      { name: "Item 8", quantity: 1 },
      { name: "Item 9", quantity: 1 },
      { name: "Item 10", quantity: 1 },
      { name: "Item 11", quantity: 1 },
      { name: "Item 12", quantity: 1 },
      { name: "Item 13", quantity: 1 },
      { name: "Item 14", quantity: 1 },
      { name: "Item 15", quantity: 1 },
      { name: "Item 16", quantity: 1 },
      { name: "Item 17", quantity: 1 },
      { name: "Item 18", quantity: 1 },
      { name: "Item 19", quantity: 1 },
      { name: "Item 20", quantity: 1 },
    ],
    total: 0,
  };
  render(<CheckoutSummary order={order} />);
  expect(screen.getByText("Item 1")).toBeInTheDocument();
  expect(screen.getByText("Item 2")).toBeInTheDocument();
  expect(screen.getByText("Item 3")).toBeInTheDocument();
  expect(screen.getByText("Item 4")).toBeInTheDocument();
  expect(screen.getByText("Item 5")).toBeInTheDocument();
  expect(screen.getByText("Item 6")).toBeInTheDocument();
  expect(screen.getByText("Item 7")).toBeInTheDocument();
  expect(screen.getByText("Item 8")).toBeInTheDocument();
  expect(screen.getByText("Item 9")).toBeInTheDocument();
  expect(screen.getByText("Item 10")).toBeInTheDocument();
  expect(screen.getByText("Item 11")).toBeInTheDocument();
  expect(screen.getByText("Item 12")).toBeInTheDocument();
  expect(screen.getByText("Item 13")).toBeInTheDocument();
  expect(screen.getByText("Item 14")).toBeInTheDocument();
  expect(screen.getByText("Item 15")).toBeInTheDocument();
  expect(screen.getByText("Item 16")).toBeInTheDocument();
  expect(screen.getByText("Item 17")).toBeInTheDocument();
  expect(screen.getByText("Item 18")).toBeInTheDocument();
  expect(screen.getByText("Item 19")).toBeInTheDocument();
  expect(screen.getByText("Item 20")).toBeInTheDocument();
});
