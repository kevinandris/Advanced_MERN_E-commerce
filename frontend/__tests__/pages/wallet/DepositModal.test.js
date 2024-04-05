import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DepositModal from "../../../src/pages/wallet/DepositModal";

test("Input field is focused on mount", () => {
  render(<DepositModal />);
  const inputField = screen.getByPlaceholderText("Amount");
  expect(document.activeElement).toBe(inputField);
});

test("Cancel button triggers closeModal function", () => {
  const closeModal = jest.fn();
  render(<DepositModal closeModal={closeModal} />);
  const cancelButton = screen.getByText("Cancel");
  fireEvent.click(cancelButton);
  expect(closeModal).toHaveBeenCalledTimes(1);
});

test("Updates depositData prop when 'stripe' is selected", () => {
  const handleDepositChange = jest.fn();
  const depositData = { amount: "", paymentMethod: "" };
  render(
    <DepositModal
      handleDepositChange={handleDepositChange}
      depositData={depositData}
    />
  );
  const stripeRadio = screen.getByLabelText("Stripe");
  fireEvent.click(stripeRadio);
  expect(handleDepositChange).toHaveBeenCalledWith({
    target: { name: "paymentMethod", value: "stripe" },
  });
});

test("Updates depositData prop when 'flutterwave' is selected", () => {
  const handleDepositChange = jest.fn();
  const depositData = { amount: "", paymentMethod: "" };
  render(
    <DepositModal
      handleDepositChange={handleDepositChange}
      depositData={depositData}
    />
  );
  const flutterwaveRadio = screen.getByLabelText("Flutterwave");
  fireEvent.click(flutterwaveRadio);
  expect(handleDepositChange).toHaveBeenCalledWith({
    target: { name: "paymentMethod", value: "flutterwave" },
  });
});
