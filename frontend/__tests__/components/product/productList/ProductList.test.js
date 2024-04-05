import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductList from "../../../../src/components/product/productList/ProductList";

test("Renders correct number of products", () => {
  const products = [
    { _id: 1, name: "Product 1" },
    { _id: 2, name: "Product 2" },
    { _id: 3, name: "Product 3" },
  ];
  render(<ProductList products={products} />);
  const productItems = screen.getAllByTestId("product-item");
  expect(productItems.length).toBe(products.length);
});

test("Renders correct number of pages", () => {
  const products = [
    { _id: 1, name: "Product 1" },
    { _id: 2, name: "Product 2" },
    { _id: 3, name: "Product 3" },
    { _id: 4, name: "Product 4" },
    { _id: 5, name: "Product 5" },
    { _id: 6, name: "Product 6" },
    { _id: 7, name: "Product 7" },
    { _id: 8, name: "Product 8" },
    { _id: 9, name: "Product 9" },
    { _id: 10, name: "Product 10" },
    { _id: 11, name: "Product 11" },
    { _id: 12, name: "Product 12" },
  ];
  render(<ProductList products={products} />);
  const pageLinks = screen.getAllByTestId("page-link");
  expect(pageLinks.length).toBe(2);
});

test("Should render product items in a list format when grid icon is clicked and grid is set to false", () => {
  const products = [
    { _id: 1, name: "Product 1" },
    { _id: 2, name: "Product 2" },
    { _id: 3, name: "Product 3" },
  ];
  render(<ProductList products={products} />);
  const gridIcon = screen.getByTestId("grid-icon");
  fireEvent.click(gridIcon);
  const productItems = screen.getAllByTestId("product-item");
  expect(productItems.length).toBe(products.length);
  expect(productItems[0]).toHaveClass("list");
});

test("Should display all products when search input is empty", () => {
  const products = [
    { _id: 1, name: "Product 1" },
    { _id: 2, name: "Product 2" },
    { _id: 3, name: "Product 3" },
  ];
  render(<ProductList products={products} />);
  const searchInput = screen.getByTestId("search-input");
  fireEvent.change(searchInput, { target: { value: "" } });
  const productItems = screen.getAllByTestId("product-item");
  expect(productItems.length).toBe(products.length);
});
