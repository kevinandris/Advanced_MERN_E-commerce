import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AdminHome from "../../../../src/components/admin/AdminHome/AdminHome";

test("asd", () => {
  render(<AdminHome />);
});

test("Displays correct title", () => {
  render(<AdminHome />);
  const titleElement = screen.getByText("Admin Home");
  expect(titleElement).toBeInTheDocument();
});

test("Does not have additional elements", () => {
  render(<AdminHome />);
  const additionalElement = screen.queryByText("Additional Element");
  expect(additionalElement).toBeNull();
});
