import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import BrandList from "../../../../src/components/admin/brand/BrandList";

test("asd", () => {
  render(<BrandList />);
});

test("Displays correct number of brands", () => {
  const brands = [
    { _id: 1, name: "Brand 1", slug: "brand-1", category: "Category 1" },
    { _id: 2, name: "Brand 2", slug: "brand-2", category: "Category 2" },
    { _id: 3, name: "Brand 3", slug: "brand-3", category: "Category 3" },
  ];
  render(<BrandList />, { initialState: { category: { brands } } });
  const brandElements = screen.getAllByTestId("brand");
  expect(brandElements.length).toBe(brands.length);
});

test("Displays no brand found message", () => {
  const brands = [];
  render(<BrandList />, { initialState: { category: { brands } } });
  const messageElement = screen.getByText("No Brand Found");
  expect(messageElement).toBeInTheDocument();
});

test("Display brands after deleting a brand", async () => {
  const brands = [
    { _id: 1, name: "Brand 1", slug: "brand-1", category: "Category 1" },
    { _id: 2, name: "Brand 2", slug: "brand-2", category: "Category 2" },
    { _id: 3, name: "Brand 3", slug: "brand-3", category: "Category 3" },
  ];
  const deleteBrand = jest.fn();
  const getBrands = jest.fn();
  render(<BrandList />, {
    initialState: { category: { brands } },
    deleteBrand,
    getBrands,
  });

  const deleteButton = screen.getByLabelText("Delete");
  fireEvent.click(deleteButton);

  await waitFor(() => expect(deleteBrand).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(getBrands).toHaveBeenCalledTimes(2));

  const brandElements = screen.getAllByTestId("brand");
  expect(brandElements.length).toBe(brands.length - 1);
});

test("Display error message on deleteBrandButton failure", async () => {
  const brands = [
    { _id: 1, name: "Brand 1", slug: "brand-1", category: "Category 1" },
    { _id: 2, name: "Brand 2", slug: "brand-2", category: "Category 2" },
    { _id: 3, name: "Brand 3", slug: "brand-3", category: "Category 3" },
  ];
  const deleteBrand = jest.fn(() => {
    throw new Error("Delete brand failed");
  });
  const getBrands = jest.fn();
  render(<BrandList />, {
    initialState: { category: { brands } },
    deleteBrand,
    getBrands,
  });

  const deleteButton = screen.getByLabelText("Delete");
  fireEvent.click(deleteButton);

  await waitFor(() => expect(deleteBrand).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(getBrands).toHaveBeenCalledTimes(1));

  const errorMessage = screen.getByText("Error deleting brand");
  expect(errorMessage).toBeInTheDocument();
});
