import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CheckoutWallet from "../../../src/pages/checkout/CheckoutWallet";

test("display a loading spinner while fetching data", () => {
  render(<CheckoutWallet />);
  expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
});

test("display an error message if there is an error fetching data", async () => {
  render(<CheckoutWallet />);
  await waitFor(() => {
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });
});

test("Displaying wallet balance shows the correct value", () => {
  render(<CheckoutWallet />);
  expect(screen.getByTestId("wallet-balance")).toHaveTextContent("100");
});

test("Adding negative funds to wallet throws an error", () => {
  render(<CheckoutWallet />);
  fireEvent.click(screen.getByTestId("add-funds-button"));
  fireEvent.change(screen.getByTestId("funds-input"), {
    target: { value: "-50" },
  });
  fireEvent.click(screen.getByTestId("confirm-button"));
  expect(screen.getByTestId("error-message")).toBeInTheDocument();
});
