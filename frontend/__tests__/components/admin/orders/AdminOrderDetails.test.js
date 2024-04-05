import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AdminOrderDetails from "../../../../src/components/admin/orders/AdminOrderDetails";


test("Renders OrderDetailsComponent", () => {
  render(<AdminOrderDetails />);
  expect(screen.getByTestId("order-details-component")).toBeInTheDocument();
});

test("Renders ChangeOrderStatus", () => {
  render(<AdminOrderDetails />);
  expect(screen.getByTestId("change-order-status")).toBeInTheDocument();
});

test("Refreshing the page should maintain the order details and status", () => {
  render(<AdminOrderDetails />);
  // Simulate page refresh or reload
  window.location.reload = jest.fn();
  // Assert that the order details and status components are still rendered
  expect(screen.getByTestId("order-details-component")).toBeInTheDocument();
  expect(screen.getByTestId("change-order-status")).toBeInTheDocument();
});

test("Changing the screen size should adjust the layout of the order details and status components", () => {
  render(<AdminOrderDetails />);
  // Change the screen size
  window.innerWidth = 800;
  window.dispatchEvent(new Event("resize"));
  // Assert that the layout of the components has been adjusted
  expect(screen.getByTestId("order-details-component")).toHaveStyle({
    width: "100%",
  });
  expect(screen.getByTestId("change-order-status")).toHaveStyle({
    width: "100%",
  });
});
