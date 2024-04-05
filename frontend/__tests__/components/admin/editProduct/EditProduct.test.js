import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EditProduct from "../../../../src/components/admin/editProduct/EditProduct";

test("Calls saveProduct function on form submission", () => {
  const { container } = render(<EditProduct />);
  const form = container.querySelector("form");
  fireEvent.submit(form);
  // Add assertion to check if saveProduct function is called
});

test("Displays toast error message when no image is added", () => {
  const { container } = render(<EditProduct />);
  const form = container.querySelector("form");
  fireEvent.submit(form);
  // Add assertion to check if toast error message is displayed
});

test("Update product with invalid quantity", () => {
  const { container } = render(<EditProduct />);
  const form = container.querySelector("form");
  fireEvent.change(screen.getByLabelText("Quantity"), {
    target: { value: "-10" },
  });
  fireEvent.submit(form);
  // Add assertion to check if toast error message is displayed
});

test("Update product with valid data and image", () => {
  const { container } = render(<EditProduct />);
  const form = container.querySelector("form");
  fireEvent.change(screen.getByLabelText("Quantity"), {
    target: { value: "10" },
  });
  // Add more fireEvent.change() calls to update other fields
  fireEvent.submit(form);
  // Add assertion to check if saveProduct function is called
  // Add assertion to check if navigation to "/admin/all-product" is triggered
});
