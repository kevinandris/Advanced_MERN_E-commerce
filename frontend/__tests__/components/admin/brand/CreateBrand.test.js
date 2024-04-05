import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateBrand from "../../../../src/components/admin/brand/CreateBrand";


test("Displays error message for brand name less than 3 characters", () => {
  render(<CreateBrand />);
  const nameInput = screen.getByPlaceholderText("Enter a name");
  fireEvent.change(nameInput, { target: { value: "ab" } });
  const saveButton = screen.getByText("Save Brand");
  fireEvent.click(saveButton);
  const errorMessage = screen.getByText(
    "Brand name must be more than 3 characters"
  );
  expect(errorMessage).toBeInTheDocument();
});

test("Displays error message for no parent category selected", () => {
  render(<CreateBrand />);
  const saveButton = screen.getByText("Save Brand");
  fireEvent.click(saveButton);
  const errorMessage = screen.getByText("Please add a parent category");
  expect(errorMessage).toBeInTheDocument();
});

test("Should display loading spinner", () => {
  render(<CreateBrand />);
  const loadingSpinner = screen.getByTestId("loading-spinner");
  expect(loadingSpinner).toBeInTheDocument();
});
test("Should not display any category options", () => {
  render(<CreateBrand />);
  const categoryOptions = screen.queryAllByRole("option");
  expect(categoryOptions.length).toBe(1); // Only the default "Select Category" option should be present
});
