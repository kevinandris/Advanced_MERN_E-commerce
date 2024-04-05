import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateCoupon from "../../../../src/components/admin/coupon/CreateCoupon";

test("Displays error message for short coupon name", () => {
  render(<CreateCoupon />);
  const nameInput = screen.getByPlaceholderText("Enter a coupon");
  fireEvent.change(nameInput, { target: { value: "abc" } });
  const saveButton = screen.getByText("Save Coupon");
  fireEvent.click(saveButton);
  const errorMessage = screen.getByText("Coupon must be up to 5 characters");
  expect(errorMessage).toBeInTheDocument();
});

test("Displays error message for invalid discount", () => {
  render(<CreateCoupon />);
  const discountInput = screen.getByPlaceholderText("Type the coupon discount");
  fireEvent.change(discountInput, { target: { value: 0 } });
  const saveButton = screen.getByText("Save Coupon");
  fireEvent.click(saveButton);
  const errorMessage = screen.getByText("Discount must be greater than one");
  expect(errorMessage).toBeInTheDocument();
});

test("Resets form fields after submitting coupon", async () => {
  render(<CreateCoupon />);
  const nameInput = screen.getByPlaceholderText("Enter a coupon");
  fireEvent.change(nameInput, { target: { value: "Test Coupon" } });
  const discountInput = screen.getByPlaceholderText("Type the coupon discount");
  fireEvent.change(discountInput, { target: { value: 10 } });
  const expiryDateInput = screen.getByLabelText("Expiry Date:");
  fireEvent.change(expiryDateInput, { target: { value: "2022-12-31" } });
  const saveButton = screen.getByText("Save Coupon");
  fireEvent.click(saveButton);
  await waitFor(() => {
    expect(nameInput.value).toBe("");
    expect(discountInput.value).toBe("0");
    expect(expiryDateInput.value).toBe("");
  });
});

test("Submits coupon with valid name, discount, and expiry date", async () => {
  render(<CreateCoupon />);
  const nameInput = screen.getByPlaceholderText("Enter a coupon");
  fireEvent.change(nameInput, { target: { value: "Test Coupon" } });
  const discountInput = screen.getByPlaceholderText("Type the coupon discount");
  fireEvent.change(discountInput, { target: { value: 10 } });
  const expiryDateInput = screen.getByLabelText("Expiry Date:");
  fireEvent.change(expiryDateInput, { target: { value: "2022-12-31" } });
  const saveButton = screen.getByText("Save Coupon");
  fireEvent.click(saveButton);
  await waitFor(() => {
    expect(nameInput.value).toBe("");
    expect(discountInput.value).toBe("0");
    expect(expiryDateInput.value).toBe("");
  });
});
