import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PageMenu from "../../../src/components/pageMenu/PageMenu";

test("Renders correct menu items", () => {
  render(<PageMenu />);
  expect(screen.getByText("Profile")).toBeInTheDocument();
  expect(screen.getByText("My Wallet")).toBeInTheDocument();
  expect(screen.getByText("Wishlist")).toBeInTheDocument();
});

test("Navigates to correct routes", () => {
  render(<PageMenu />);
  fireEvent.click(screen.getByText("Profile"));
  expect(window.location.pathname).toBe("/profile");
  fireEvent.click(screen.getByText("My Wallet"));
  expect(window.location.pathname).toBe("/wallet");
  fireEvent.click(screen.getByText("Wishlist"));
  expect(window.location.pathname).toBe("/wishlist");
});

test("Check styling of navigation bar", () => {
  render(<PageMenu />);
  const navBar = screen.getByRole("navigation");
  expect(navBar).toHaveClass("--bg-primary");
  expect(navBar).toHaveClass("--p");
  expect(navBar).toHaveClass("--mb");
});

test("Clicking on non-existent link", () => {
  render(<PageMenu />);
  fireEvent.click(screen.getByText("Non-existent Link"));
  expect(window.location.pathname).not.toBe("/nonexistent");
});
