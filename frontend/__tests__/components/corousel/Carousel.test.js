import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Carousel from "../../../src/components/corousel/Carousel";


test("Renders correct number of products", () => {
  const products = ["Product 1", "Product 2", "Product 3"];
  render(<Carousel products={products} />);
  const productElements = screen.getAllByTestId("product");
  expect(productElements.length).toBe(products.length);
});

test("Renders products in correct order", () => {
  const products = ["Product 1", "Product 2", "Product 3"];
  render(<Carousel products={products} />);
  const productElements = screen.getAllByTestId("product");
  productElements.forEach((element, index) => {
    expect(element.textContent).toBe(products[index]);
  });
});

test("Renders an empty Carousel", () => {
  const products = [];
  render(<Carousel products={products} />);
  const productElements = screen.queryAllByTestId("product");
  expect(productElements.length).toBe(0);
});

test("Renders a Carousel with single product", () => {
  const products = ["Product 1"];
  render(<Carousel products={products} />);
  const productElements = screen.getAllByTestId("product");
  expect(productElements.length).toBe(1);
  expect(productElements[0].textContent).toBe(products[0]);
});
