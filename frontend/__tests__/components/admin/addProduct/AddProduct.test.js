import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddProduct from "../../../../src/components/admin/addProduct/AddProduct";

test("asd", () => {
  render(<AddProduct />);
});

test("Displays error message when no image is added", () => {
  render(<AddProduct />);
  fireEvent.click(screen.getByText("Save"));
  expect(screen.getByText("Please add an image")).toBeInTheDocument();
});

test("Navigates to all-product page after creating a product", async () => {
  render(<AddProduct />);
  fireEvent.click(screen.getByText("Save"));
  await waitFor(() => {
    expect(navigate).toHaveBeenCalledWith("/admin/all-product");
  });
});

test("generateSKU function generates the correct SKU based on the category", () => {
  const category = "electronics";
  const expectedSKU = "ELE-" + Date.now();
  const generatedSKU = generateSKU(category);
  expect(generatedSKU).toBe(expectedSKU);
});

test("saveProduct function displays an error message when files array length is less than 1", () => {
  render(<AddProduct />);
  fireEvent.click(screen.getByText("Save"));
  expect(screen.getByText("Please add an image")).toBeInTheDocument();
});
