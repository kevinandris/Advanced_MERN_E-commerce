import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import OrderDetailsComponent from "../../../src/pages/order/OrderDetailsComponent";

test("Displays Order Details Correctly", () => {
  const order = {
    _id: "123",
    shippingAddress: {
      name: "John Doe",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      country: "USA",
    },
    orderAmount: 100,
    coupon: {
      name: "SUMMER20",
      discount: 20,
    },
    paymentMethod: "Credit Card",
    orderStatus: "Pending",
    cartItems: [
      {
        _id: "1",
        name: "Product 1",
        price: 10,
        image: ["image1.jpg"],
        cartQuantity: 2,
      },
      {
        _id: "2",
        name: "Product 2",
        price: 20,
        image: ["image2.jpg"],
        cartQuantity: 3,
      },
    ],
  };

  render(<OrderDetailsComponent order={order} />);

  expect(screen.getByText("Order ID → 123")).toBeInTheDocument();
  expect(screen.getByText("Ship to → John Doe")).toBeInTheDocument();
  expect(screen.getByText("Order Amount → 100")).toBeInTheDocument();
  expect(screen.getByText("Coupon → SUMMER20 | 20%")).toBeInTheDocument();
  expect(screen.getByText("Payment Method → Credit Card")).toBeInTheDocument();
  expect(screen.getByText("Order Status → Pending")).toBeInTheDocument();
  expect(
    screen.getByText("Address → 123 Main St, Apt 4B, New York")
  ).toBeInTheDocument();
  expect(screen.getByText("State → NY")).toBeInTheDocument();
  expect(screen.getByText("Country → USA")).toBeInTheDocument();
  expect(screen.getByText("Product 1")).toBeInTheDocument();
  expect(screen.getByText("Product 2")).toBeInTheDocument();
});

test("Calls downloadPDF on button click", () => {
  const order = {
    _id: "123",
    shippingAddress: {
      name: "John Doe",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      country: "USA",
    },
    orderAmount: 100,
    coupon: {
      name: "SUMMER20",
      discount: 20,
    },
    paymentMethod: "Credit Card",
    orderStatus: "Pending",
    cartItems: [
      {
        _id: "1",
        name: "Product 1",
        price: 10,
        image: ["image1.jpg"],
        cartQuantity: 2,
      },
      {
        _id: "2",
        name: "Product 2",
        price: 20,
        image: ["image2.jpg"],
        cartQuantity: 3,
      },
    ],
  };

  render(<OrderDetailsComponent order={order} />);

  const downloadButton = screen.getByText("Download as PDF");
  fireEvent.click(downloadButton);

  // TODO: Add assertions to check if the downloadPDF function is called
});

test("Navigates back to order page", () => {
  const orderPageLink = "/orders";
  render(<OrderDetailsComponent orderPageLink={orderPageLink} />);

  const backButton = screen.getByText("← Back to Orders");
  fireEvent.click(backButton);

  // TODO: Add assertions to check if the user is navigated back to the order page
});

test("Handles error when getOrder fails", async () => {
  const error = "Failed to fetch order details";
  jest.spyOn(api, "getOrder").mockRejectedValueOnce(new Error(error));

  render(<OrderDetailsComponent />);

  await waitFor(() => {
    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
