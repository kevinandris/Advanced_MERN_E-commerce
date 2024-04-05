import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Navbar from "../../../../src/components/admin/navbar/Navbar";


test("Displays user name in Navbar", () => {
  const user = { name: "John Doe" };
  useSelector.mockReturnValue(user);

  render(<Navbar />);

  expect(screen.getByText("John Doe")).toBeInTheDocument();
});

test("Applies active link class in Navbar", () => {
  render(<Navbar />);

  const activeLink = screen.getByText("Home");
  expect(activeLink).toHaveClass("activeLink");
});

test("Navigates to home page when home link is clicked", () => {
  render(<Navbar />);

  const homeLink = screen.getByText("Home");
  fireEvent.click(homeLink);

  expect(mockHistoryPush).toHaveBeenCalledWith("/admin/home");
});
