import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import VerifyCoupon from "../../../src/components/verifyCoupon/VerifyCoupon";

test("shows add coupon text when no coupon is applied", () => {
  render(<VerifyCoupon />);
  expect(screen.getByText("Add Coupon")).toBeInTheDocument();
});

test("shows remove coupon text when a coupon is applied", () => {
  render(<VerifyCoupon />);
  fireEvent.click(screen.getByText("Add Coupon"));
  expect(screen.getByText("Remove Coupon")).toBeInTheDocument();
});

test("verifyCoupon and display cart discount", () => {
  render(<VerifyCoupon />);
  fireEvent.click(screen.getByText("Add Coupon"));
  const couponInput = screen.getByPlaceholderText("Coupon name");
  const verifyButton = screen.getByText("Verify");
  fireEvent.change(couponInput, { target: { value: "COUPON123" } });
  fireEvent.click(verifyButton);
  expect(screen.getByText("Cart Discount")).toBeInTheDocument();
});

test("removeCoupon and reset cart total amount", () => {
  render(<VerifyCoupon />);
  fireEvent.click(screen.getByText("Add Coupon"));
  const removeButton = screen.getByText("Remove Coupon");
  fireEvent.click(removeButton);
  expect(screen.queryByText("Remove Coupon")).not.toBeInTheDocument();
});
