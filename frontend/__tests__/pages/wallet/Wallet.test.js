import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Wallet from "../../../src/pages/wallet/Wallet";

test("Displays user's balance", () => {
  const balance = 100;
  render(<Wallet />);
  expect(screen.getByText(`Balance: $${balance}`)).toBeInTheDocument();
});

test("Displays success message after successful transaction", async () => {
  const successMessage = "Transaction successful";
  render(<Wallet />);
  await waitFor(() => {
    fireEvent.click(screen.getByText("Transfer Money"));
  });
  fireEvent.change(screen.getByLabelText("Amount"), { target: { value: 50 } });
  fireEvent.change(screen.getByLabelText("Receiver"), {
    target: { value: "example@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Description"), {
    target: { value: "Test transaction" },
  });
  fireEvent.click(screen.getByText("Transfer"));
  await waitFor(() => {
    expect(screen.getByText(successMessage)).toBeInTheDocument();
  });
});

test("Deposit money with flutterwave", () => {
  render(<Wallet />);
  fireEvent.click(screen.getByText("Deposit Money"));
  fireEvent.change(screen.getByLabelText("Amount"), { target: { value: 100 } });
  fireEvent.change(screen.getByLabelText("Payment Method"), {
    target: { value: "flutterwave" },
  });
  fireEvent.click(screen.getByText("Deposit"));
  expect(
    screen.getByText("Processing payment with flutterwave...")
  ).toBeInTheDocument();
});

test("Deposit money with invalid payment method", () => {
  render(<Wallet />);
  fireEvent.click(screen.getByText("Deposit Money"));
  fireEvent.change(screen.getByLabelText("Amount"), { target: { value: 100 } });
  fireEvent.change(screen.getByLabelText("Payment Method"), {
    target: { value: "invalid" },
  });
  fireEvent.click(screen.getByText("Deposit"));
  expect(
    screen.getByText("Please select a valid payment method")
  ).toBeInTheDocument();
});
