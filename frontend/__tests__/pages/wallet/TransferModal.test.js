import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TransferModal from "../../../src/pages/wallet/TransferModal";

test("Focuses on input field", () => {
  render(<TransferModal />);
  const inputField = screen.getByPlaceholderText("Amount");
  expect(document.activeElement).toBe(inputField);
});

test("Displays receiver's name", () => {
  const receiverName = "John Doe";
  render(<TransferModal />);
  const receiverNameElement = screen.getByText(receiverName);
  expect(receiverNameElement).toBeInTheDocument();
});

test("Verify button is disabled when receiver's account is not filled", () => {
  render(<TransferModal />);
  const verifyButton = screen.getByText("Verify");
  expect(verifyButton).toBeDisabled();
});

test("Clicking cancel button closes the modal", () => {
  render(<TransferModal />);
  const cancelButton = screen.getByText("Cancel");
  fireEvent.click(cancelButton);
  expect(screen.queryByText("Send Money To Someone")).not.toBeInTheDocument();
});
