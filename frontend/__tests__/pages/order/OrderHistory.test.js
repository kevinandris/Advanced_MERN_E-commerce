import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import OrderHistory from "../../../src/pages/order/OrderHistory";

test("asd", () => {
  render(<OrderHistory />);
});

test("Displays correct heading", () => {
  render(<OrderHistory />);
  const heading = screen.getByText("Your Order History");
  expect(heading).toBeInTheDocument();
});

test("Displays correct message", () => {
  render(<OrderHistory />);
  const message = screen.getByText("Open an order to leave a Product Review");
  expect(message).toBeInTheDocument();
});

test("Opens order details on click", () => {
  const navigateMock = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => navigateMock,
  }));

  render(<OrderHistory />);
  fireEvent.click(screen.getByText("Open an order"));

  expect(navigateMock).toHaveBeenCalledWith("/order-details/1");
});

test("Displays list of orders", () => {
  render(<OrderHistory />);
  const listOfOrders = screen.getByTestId("list-of-orders");

  expect(listOfOrders).toBeInTheDocument();
});
