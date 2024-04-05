import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AdminOnlyRoute from "../../../src/components/hiddenLink/AdminOnlyRoute";

test("renders specific message when user is not an admin", () => {
  render(<AdminOnlyRoute />);
  expect(
    screen.getByText("You are not authorized to view this page.")
  ).toBeInTheDocument();
});

test("redirects to admin dashboard when user is an admin", () => {
  render(<AdminOnlyRoute />);
  expect(screen.getByTestId("admin-dashboard")).toBeInTheDocument();
});
test("renders AdminOnlyRoute component with props", () => {
  const props = {
    isAdmin: true,
    username: "admin",
  };
  render(<AdminOnlyRoute {...props} />);
  expect(screen.getByTestId("admin-dashboard")).toBeInTheDocument();
});

test("checks user role for non-admin access", () => {
  const props = {
    isAdmin: false,
    username: "user",
  };
  render(<AdminOnlyRoute {...props} />);
  expect(
    screen.getByText("You are not authorized to view this page.")
  ).toBeInTheDocument();
});
