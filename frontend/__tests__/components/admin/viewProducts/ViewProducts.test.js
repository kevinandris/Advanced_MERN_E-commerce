import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ViewProducts from "../../../../src/components/admin/viewProducts/ViewProducts";


test("Displays correct number of products found", () => {
  const products = [
    {
      _id: "1",
      name: "Product 1",
      category: "Category 1",
      price: 10,
      quantity: 5,
    },
    {
      _id: "2",
      name: "Product 2",
      category: "Category 2",
      price: 20,
      quantity: 10,
    },
    {
      _id: "3",
      name: "Product 3",
      category: "Category 3",
      price: 30,
      quantity: 15,
    },
  ];
  render(<ViewProducts />, { initialState: { product: { products } } });
  const productsFound = screen.getByText("~ 3 Products found");
  expect(productsFound).toBeInTheDocument();
});

test("Displays no products found message", () => {
  const products = [];
  render(<ViewProducts />, { initialState: { product: { products } } });
  const noProductsMessage = screen.getByText("No products found...");
  expect(noProductsMessage).toBeInTheDocument();
});

test("Paginate to next page", () => {
  const products = [
    {
      _id: "1",
      name: "Product 1",
      category: "Category 1",
      price: 10,
      quantity: 5,
    },
    {
      _id: "2",
      name: "Product 2",
      category: "Category 2",
      price: 20,
      quantity: 10,
    },
    {
      _id: "3",
      name: "Product 3",
      category: "Category 3",
      price: 30,
      quantity: 15,
    },
    {
      _id: "4",
      name: "Product 4",
      category: "Category 4",
      price: 40,
      quantity: 20,
    },
    {
      _id: "5",
      name: "Product 5",
      category: "Category 5",
      price: 50,
      quantity: 25,
    },
    {
      _id: "6",
      name: "Product 6",
      category: "Category 6",
      price: 60,
      quantity: 30,
    },
    {
      _id: "7",
      name: "Product 7",
      category: "Category 7",
      price: 70,
      quantity: 35,
    },
    {
      _id: "8",
      name: "Product 8",
      category: "Category 8",
      price: 80,
      quantity: 40,
    },
    {
      _id: "9",
      name: "Product 9",
      category: "Category 9",
      price: 90,
      quantity: 45,
    },
    {
      _id: "10",
      name: "Product 10",
      category: "Category 10",
      price: 100,
      quantity: 50,
    },
    {
      _id: "11",
      name: "Product 11",
      category: "Category 11",
      price: 110,
      quantity: 55,
    },
    {
      _id: "12",
      name: "Product 12",
      category: "Category 12",
      price: 120,
      quantity: 60,
    },
    {
      _id: "13",
      name: "Product 13",
      category: "Category 13",
      price: 130,
      quantity: 65,
    },
    {
      _id: "14",
      name: "Product 14",
      category: "Category 14",
      price: 140,
      quantity: 70,
    },
    {
      _id: "15",
      name: "Product 15",
      category: "Category 15",
      price: 150,
      quantity: 75,
    },
  ];
  render(<ViewProducts />, { initialState: { product: { products } } });

  // Click on next page
  fireEvent.click(screen.getByText("Next"));

  // Check if the correct products are displayed
  const product1 = screen.getByText("Product 11");
  const product2 = screen.getByText("Product 12");
  const product3 = screen.getByText("Product 13");
  const product4 = screen.getByText("Product 14");
  const product5 = screen.getByText("Product 15");

  expect(product1).toBeInTheDocument();
  expect(product2).toBeInTheDocument();
  expect(product3).toBeInTheDocument();
  expect(product4).toBeInTheDocument();
  expect(product5).toBeInTheDocument();
});

test("Delete a product", async () => {
  const products = [
    {
      _id: "1",
      name: "Product 1",
      category: "Category 1",
      price: 10,
      quantity: 5,
    },
    {
      _id: "2",
      name: "Product 2",
      category: "Category 2",
      price: 20,
      quantity: 10,
    },
    {
      _id: "3",
      name: "Product 3",
      category: "Category 3",
      price: 30,
      quantity: 15,
    },
  ];
  render(<ViewProducts />, { initialState: { product: { products } } });

  // Click on delete button for product 2
  fireEvent.click(screen.getByTestId("delete-product-2"));

  // Confirm delete
  await waitFor(() => {
    fireEvent.click(screen.getByText("Delete"));
  });

  // Check if the product is removed from the list
  const product1 = screen.getByText("Product 1");
  const product3 = screen.getByText("Product 3");

  expect(product1).toBeInTheDocument();
  expect(product3).toBeInTheDocument();
});
