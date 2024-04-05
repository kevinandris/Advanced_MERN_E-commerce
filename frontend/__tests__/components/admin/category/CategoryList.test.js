import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CategoryList from "../../../../src/components/admin/category/CategoryList";

test("Displays correct number of categories", () => {
  const categories = [
    { _id: "1", name: "Category 1", slug: "category-1" },
    { _id: "2", name: "Category 2", slug: "category-2" },
    { _id: "3", name: "Category 3", slug: "category-3" },
  ];
  render(<CategoryList />, {
    initialState: { category: { isLoading: false, categories } },
  });
  const categoryRows = screen.getAllByRole("row");
  expect(categoryRows.length).toBe(categories.length + 1); // +1 for the table header row
});

test("Displays 'No Category Found' message when no categories are found", () => {
  const categories = [];
  render(<CategoryList />, {
    initialState: { category: { isLoading: false, categories } },
  });
  const noCategoryMessage = screen.getByText("No Category Found");
  expect(noCategoryMessage).toBeInTheDocument();
});

test("Confirming category deletion with correct slug", () => {
  const slug = "category-1";
  const confirmAlertMock = jest.spyOn(window, "confirmAlert");
  const deleteCategoryButtonMock = jest.fn();
  confirmAlertMock.mockImplementation((options) => {
    options.buttons[0].onClick();
  });
  render(<CategoryList />);
  fireEvent.click(screen.getByText("Delete"));
  expect(confirmAlertMock).toHaveBeenCalledWith({
    title: "Delete Category",
    message: "Are you sure you want to delete this category?",
    buttons: [
      {
        label: "Delete",
        onClick: expect.any(Function),
      },
      {
        label: "Cancel",
      },
    ],
  });
  expect(deleteCategoryButtonMock).toHaveBeenCalledWith(slug);
  confirmAlertMock.mockRestore();
});
test("Confirming category deletion with empty slug", () => {
  const slug = "";
  const confirmAlertMock = jest.spyOn(window, "confirmAlert");
  const deleteCategoryButtonMock = jest.fn();
  confirmAlertMock.mockImplementation((options) => {
    options.buttons[0].onClick();
  });
  render(<CategoryList />);
  fireEvent.click(screen.getByText("Delete"));
  expect(confirmAlertMock).toHaveBeenCalledWith({
    title: "Delete Category",
    message: "Are you sure you want to delete this category?",
    buttons: [
      {
        label: "Delete",
        onClick: expect.any(Function),
      },
      {
        label: "Cancel",
      },
    ],
  });
  expect(deleteCategoryButtonMock).toHaveBeenCalledWith(slug);
  confirmAlertMock.mockRestore();
});
