import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Admin from "../../src/pages/admin/Admin";

test("'", () => {
  render(<Admin />);
});

test("Renders the Navbar component", () => {
  render(<Admin />);
  const navbarElement = screen.getByTestId("navbar");
  expect(navbarElement).toBeInTheDocument();
});

test("Renders the correct components based on the path", () => {
  render(<Admin />);
  const homeElement = screen.getByTestId("admin-home");
  expect(homeElement).toBeInTheDocument();

  fireEvent.click(screen.getByText("Category"));
  const categoryElement = screen.getByTestId("category");
  expect(categoryElement).toBeInTheDocument();

  fireEvent.click(screen.getByText("Brand"));
  const brandElement = screen.getByTestId("brand");
  expect(brandElement).toBeInTheDocument();

  fireEvent.click(screen.getByText("Add Product"));
  const addProductElement = screen.getByTestId("add-product");
  expect(addProductElement).toBeInTheDocument();

  fireEvent.click(screen.getByText("All Product"));
  const viewProductsElement = screen.getByTestId("view-products");
  expect(viewProductsElement).toBeInTheDocument();

  fireEvent.click(screen.getByText("Coupon"));
  const couponElement = screen.getByTestId("coupon");
  expect(couponElement).toBeInTheDocument();

  fireEvent.click(screen.getByText("Orders"));
  const ordersElement = screen.getByTestId("orders");
  expect(ordersElement).toBeInTheDocument();
});

test("Renders AdminOrderDetails component with the correct order ID", () => {
  render(<Admin />);
  fireEvent.click(screen.getByText("Order Details"));
  const orderDetailsElement = screen.getByTestId("admin-order-details");
  expect(orderDetailsElement).toBeInTheDocument();
  expect(orderDetailsElement).toHaveTextContent("Order ID: 12345");
});

test("Renders a not found page when a non-existent route is clicked", () => {
  render(<Admin />);
  fireEvent.click(screen.getByText("Non-Existent Route"));
  const notFoundElement = screen.getByTestId("not-found");
  expect(notFoundElement).toBeInTheDocument();
  expect(notFoundElement).toHaveTextContent("Page Not Found");
});
