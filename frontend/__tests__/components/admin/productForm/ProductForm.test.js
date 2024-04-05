import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductForm from "../../../../src/components/admin/productForm/ProductForm";


test("Renders ProductForm with input fields", () => {
  render(<ProductForm />);
  expect(screen.getByLabelText("Name:")).toBeInTheDocument();
  expect(screen.getByLabelText("Category")).toBeInTheDocument();
  expect(screen.getByLabelText("Brand")).toBeInTheDocument();
  expect(screen.getByLabelText("Colour")).toBeInTheDocument();
  expect(screen.getByLabelText("Regular Price")).toBeInTheDocument();
  expect(screen.getByLabelText("Current Price")).toBeInTheDocument();
  expect(screen.getByLabelText("Quantity")).toBeInTheDocument();
});

test("Updates product state on input change", () => {
  render(<ProductForm />);
  const nameInput = screen.getByLabelText("Name:");
  fireEvent.change(nameInput, { target: { value: "iPhone 12" } });
  expect(nameInput.value).toBe("iPhone 12");
});

test("Saving the product", () => {
  const saveProductMock = jest.fn();
  render(<ProductForm saveProduct={saveProductMock} />);
  fireEvent.submit(screen.getByRole("button"));
  expect(saveProductMock).toHaveBeenCalled();
});

test("Changing the category", () => {
  const getCategoriesMock = jest.fn();
  const getBrandsMock = jest.fn();
  render(<ProductForm />);
  fireEvent.change(screen.getByLabelText("Category"), {
    target: { value: "Electronics" },
  });
  expect(getCategoriesMock).toHaveBeenCalled();
  expect(getBrandsMock).toHaveBeenCalled();
});
