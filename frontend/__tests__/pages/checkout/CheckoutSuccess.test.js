import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CheckoutSuccess from "../../../src/pages/checkout/CheckoutSuccess";

test("Displays success message", () => {
  render(<CheckoutSuccess />);
  expect(screen.getByText("Payment successful!")).toBeInTheDocument();
});

test("Redirects to home page after delay", async () => {
  render(<CheckoutSuccess />);
  await waitFor(() => {
    expect(screen.getByText("Redirecting to home page...")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(
      screen.queryByText("Redirecting to home page...")
    ).not.toBeInTheDocument();
    expect(screen.getByText("Welcome to our store!")).toBeInTheDocument();
  });
});
