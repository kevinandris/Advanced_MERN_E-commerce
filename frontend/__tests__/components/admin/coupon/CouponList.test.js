import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CouponList from "../../../../src/components/admin/coupon/CouponList";

test("asd", () => {
  render(<CouponList />);
});

test("Displays correct number of coupons", () => {
  const mockCoupons = [
    {
      _id: "1",
      name: "Coupon 1",
      discount: 10,
      expiresAt: "2022-01-01",
      createdAt: "2021-01-01",
    },
    {
      _id: "2",
      name: "Coupon 2",
      discount: 20,
      expiresAt: "2022-02-01",
      createdAt: "2021-02-01",
    },
    {
      _id: "3",
      name: "Coupon 3",
      discount: 30,
      expiresAt: "2022-03-01",
      createdAt: "2021-03-01",
    },
  ];
  render(<CouponList />);
  const couponElements = screen.getAllByTestId("coupon");
  expect(couponElements.length).toBe(mockCoupons.length);
});

test("Displays no coupon found message", () => {
  const mockCoupons = [];
  render(<CouponList />);
  const noCouponMessage = screen.getByText("No Coupon Found");
  expect(noCouponMessage).toBeInTheDocument();
});

test("Fetching coupons successfully", async () => {
  const mockCoupons = [
    {
      _id: "1",
      name: "Coupon 1",
      discount: 10,
      expiresAt: "2022-01-01",
      createdAt: "2021-01-01",
    },
    {
      _id: "2",
      name: "Coupon 2",
      discount: 20,
      expiresAt: "2022-02-01",
      createdAt: "2021-02-01",
    },
    {
      _id: "3",
      name: "Coupon 3",
      discount: 30,
      expiresAt: "2022-03-01",
      createdAt: "2021-03-01",
    },
  ];
  render(<CouponList />);
  await waitFor(() => {
    expect(screen.getAllByTestId("coupon").length).toBe(mockCoupons.length);
  });
});

test("Deleting a coupon triggers modal", async () => {
  const mockCouponId = "1";
  render(<CouponList />);
  const deleteButton = screen.getByTestId(`delete-button-${mockCouponId}`);
  fireEvent.click(deleteButton);
  await waitFor(() => {
    expect(screen.getByText("Delete Coupon")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to delete this coupon?")
    ).toBeInTheDocument();
  });
});
