import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CheckoutPaypal from "../../../src/pages/checkout/CheckoutPaypal";

test("Displays correct payment method", () => {
  render(<CheckoutPaypal />);
  expect(screen.getByText("Pay with PayPal")).toBeInTheDocument();
});

test("Shows error message for PayPal issue", async () => {
  render(<CheckoutPaypal />);
  fireEvent.click(screen.getByText("Pay with PayPal"));
  await waitFor(() => {
    expect(
      screen.getByText(
        "There was an issue with PayPal. Please try again later."
      )
    ).toBeInTheDocument();
  });
});

test("Successful PayPal checkout", async () => {
  render(<CheckoutPaypal />);
  fireEvent.click(screen.getByText("Pay with PayPal"));
  await waitFor(() => {
    expect(screen.getByText("Payment successful!")).toBeInTheDocument();
  });
});

test("User cancels checkout", async () => {
  render(<CheckoutPaypal />);
  fireEvent.click(screen.getByText("Pay with PayPal"));
  await waitFor(() => {
    expect(screen.getByText("Payment cancelled by user.")).toBeInTheDocument();
  });
});
