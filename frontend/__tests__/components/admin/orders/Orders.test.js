import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Orders from "../../../../src/components/admin/orders/Orders";


test("Navigates to order details page on order click", () => {
  const navigateMock = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => navigateMock,
  }));

  render(<Orders />);

  fireEvent.click(screen.getByText("Open an order"));

  expect(navigateMock).toHaveBeenCalledWith("/admin/order-details/1");
});

test("Displays a message when there are no orders", () => {
  render(<Orders />);

  expect(screen.getByText("All Orders")).toBeInTheDocument();
  expect(screen.getByText("Open an order")).toBeInTheDocument();
  expect(screen.getByText("No orders found")).toBeInTheDocument();
});

test("Navigating to order details page with different id", () => {
  const navigateMock = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => navigateMock,
  }));

  render(<Orders />);

  fireEvent.click(screen.getByText("Open an order"));

  expect(navigateMock).toHaveBeenCalledWith("/admin/order-details/2");
});
