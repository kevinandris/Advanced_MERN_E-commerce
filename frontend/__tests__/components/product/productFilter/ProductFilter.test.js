import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductFilter from "../../../../src/components/product/productFilter/ProductFilter";


test("Displays correct number of categories", () => {
  const products = [
    { category: "Electronics", brand: "Apple" },
    { category: "Clothing", brand: "Nike" },
    { category: "Electronics", brand: "Samsung" },
    { category: "Home", brand: "IKEA" },
  ];
  render(<ProductFilter products={products} />);

  const categoryButtons = screen.getAllByRole("button");
  expect(categoryButtons).toHaveLength(4);
});

test("Filters products by category", () => {
  const products = [
    { category: "Electronics", brand: "Apple" },
    { category: "Clothing", brand: "Nike" },
    { category: "Electronics", brand: "Samsung" },
    { category: "Home", brand: "IKEA" },
  ];
  render(<ProductFilter products={products} />);

  const categoryButton = screen.getByText("Electronics");
  fireEvent.click(categoryButton);

  const filteredProducts = screen.getAllByTestId("product");
  expect(filteredProducts).toHaveLength(2);
});

test("Filters products by brand", () => {
  const products = [
    { category: "Electronics", brand: "Apple" },
    { category: "Clothing", brand: "Nike" },
    { category: "Electronics", brand: "Samsung" },
    { category: "Home", brand: "IKEA" },
  ];
  render(<ProductFilter products={products} />);

  const brandSelect = screen.getByRole("combobox");
  fireEvent.change(brandSelect, { target: { value: "Apple" } });

  const filteredProducts = screen.getAllByTestId("product");
  expect(filteredProducts).toHaveLength(1);
});

test("Sets price range within valid values", () => {
  const products = [
    { category: "Electronics", brand: "Apple" },
    { category: "Clothing", brand: "Nike" },
    { category: "Electronics", brand: "Samsung" },
    { category: "Home", brand: "IKEA" },
  ];
  render(<ProductFilter products={products} />);

  const priceSlider = screen.getByRole("slider");
  fireEvent.change(priceSlider, { target: { value: [100, 500] } });

  const filteredProducts = screen.getAllByTestId("product");
  expect(filteredProducts).toHaveLength(3);
});
