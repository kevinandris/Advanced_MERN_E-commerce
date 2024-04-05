import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PaymentOptions from "../../../src/components/paymentOptions/PaymentOptions";

test("Displays correct payment options", () => {
  render(<PaymentOptions />);
  expect(screen.getByLabelText("Stripe")).toBeInTheDocument();
  expect(screen.getByLabelText("Flutterwave")).toBeInTheDocument();
  expect(screen.getByLabelText("Paypal")).toBeInTheDocument();
  expect(screen.getByLabelText("Wallet")).toBeInTheDocument();
});

test("Shows error message when no payment method is selected", () => {
  render(<PaymentOptions />);
  fireEvent.click(screen.getByText("Checkout"));
  expect(
    screen.getByText("Please select one payment method to proceed.")
  ).toBeInTheDocument();
});

test("Triggers dispatch of SAVE_PAYMENT_METHOD action", () => {
  const dispatchMock = jest.fn();
  const useDispatchMock = jest
    .spyOn(redux, "useDispatch")
    .mockReturnValue(dispatchMock);
  render(<PaymentOptions />);
  fireEvent.click(screen.getByLabelText("Stripe"));
  fireEvent.submit(screen.getByRole("button", { name: "Checkout" }));
  expect(dispatchMock).toHaveBeenCalledWith(SAVE_PAYMENT_METHOD("stripe"));
  useDispatchMock.mockRestore();
});

test("Triggers setPayment function on button click", () => {
  const setPaymentMock = jest.fn();
  const useStateMock = jest
    .spyOn(React, "useState")
    .mockReturnValue(["", setPaymentMock]);
  render(<PaymentOptions />);
  fireEvent.click(screen.getByLabelText("Stripe"));
  fireEvent.submit(screen.getByRole("button", { name: "Checkout" }));
  expect(setPaymentMock).toHaveBeenCalled();
  useStateMock.mockRestore();
});
