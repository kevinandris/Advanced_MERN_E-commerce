import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CheckoutStripe from "../../../src/pages/checkout/CheckoutStripe";

test("Displays loading spinner", () => {
  render(<CheckoutStripe />);
  expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
});

test("Displays error message", async () => {
  render(<CheckoutStripe />);
  await waitFor(() => {
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });
});

test("TestCheckoutStripeRendering", () => {
  render(<CheckoutStripe />);
});

test("TestCheckoutStripeFormInput", () => {
  render(<CheckoutStripe />);
  const input = screen.getByTestId("form-input");
  fireEvent.change(input, { target: { value: "test" } });
  expect(input.value).toBe("test");
});
