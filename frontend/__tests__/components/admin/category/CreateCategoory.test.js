import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateCategory from "../../../../src/components/admin/category/CreateCategory";

test("Displays error message for invalid name", () => {
  render(<CreateCategory />);
  const input = screen.getByPlaceholderText("Category");
  fireEvent.change(input, { target: { value: "ab" } });
  const button = screen.getByText("Save Category");
  fireEvent.click(button);
  const errorMessage = screen.getByText("Brand must be up to 3 characters");
  expect(errorMessage).toBeInTheDocument();
});

test("Dispatches createCategory and getCategories actions", async () => {
  const mockDispatch = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
    useSelector: () => ({ isLoading: false }),
  }));
  jest.mock("../../../../src/redux/actions/categoryActions", () => ({
    createCategory: () => jest.fn(),
    getCategories: () => jest.fn(),
  }));

  render(<CreateCategory />);
  const input = screen.getByPlaceholderText("Category");
  fireEvent.change(input, { target: { value: "Test Category" } });
  const button = screen.getByText("Save Category");
  fireEvent.click(button);

  await waitFor(() => {
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});

test("Saving a category with a long name", async () => {
  render(<CreateCategory />);
  const input = screen.getByPlaceholderText("Category");
  fireEvent.change(input, { target: { value: "Long Category Name" } });
  const button = screen.getByText("Save Category");
  fireEvent.click(button);
  await waitFor(() => {
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
  expect(input.value).toBe("");
});

test("Displaying loading state during category creation", () => {
  const mockDispatch = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
    useSelector: () => ({ isLoading: true }),
  }));
  render(<CreateCategory />);
  const loader = screen.getByTestId("loader");
  expect(loader).toBeInTheDocument();
});
