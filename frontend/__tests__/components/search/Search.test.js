import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Search from "../../../src/components/search/Search";

test("should render with correct placeholder text", () => {
  render(<Search />);
  const inputElement = screen.getByPlaceholderText("Search product");
  expect(inputElement).toBeInTheDocument();
});

test("should call onChange function when input value changes", () => {
  const onChangeMock = jest.fn();
  render(<Search onChange={onChangeMock} />);
  const inputElement = screen.getByPlaceholderText("Search product");
  fireEvent.change(inputElement, { target: { value: "test" } });
  expect(onChangeMock).toHaveBeenCalledTimes(1);
});

test("should have a size of 20", () => {
  render(<Search />);
  const iconElement = screen.getByTestId("search-icon");
  expect(iconElement).toHaveAttribute("size", "20");
});

test("should have a color of black", () => {
  render(<Search />);
  const iconElement = screen.getByTestId("search-icon");
  expect(iconElement).toHaveAttribute("color", "#000000");
});
