import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Product from "../../src/pages/shop/Product";

test("renders ProductFilter component when isLoading is false", () => {
  render(<Product />);
  expect(screen.queryByTestId("product-filter")).toBeInTheDocument();
});

test("renders Spinner component when isLoading is true", () => {
  render(<Product />);
  expect(screen.queryByTestId("spinner")).toBeInTheDocument();
});

test("Dispatches getProducts when component is rendered", () => {
  const dispatchMock = jest.fn();
  useDispatch.mockReturnValue(dispatchMock);
  render(<Product />);
  expect(dispatchMock).toHaveBeenCalledWith(getProducts());
});

test("Toggles showFilter state when icon is clicked", () => {
  render(<Product />);
  const icon = screen.getByTestId("filter-icon");
  fireEvent.click(icon);
  expect(screen.getByTestId("filter").classList).toContain("show");
  fireEvent.click(icon);
  expect(screen.getByTestId("filter").classList).not.toContain("show");
});
