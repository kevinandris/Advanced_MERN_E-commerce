import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductCategory from "../../../src/pages/home/ProductCategory";

test("should render correct number of categories", () => {
  const categories = [
    { id: 1, title: "Category 1", image: "image1.jpg" },
    { id: 2, title: "Category 2", image: "image2.jpg" },
    { id: 3, title: "Category 3", image: "image3.jpg" },
  ];
  render(<ProductCategory categories={categories} />);

  const categoryElements = screen.getAllByTestId("category");
  expect(categoryElements.length).toBe(categories.length);
});

test("should render correct category titles", () => {
  const categories = [
    { id: 1, title: "Category 1", image: "image1.jpg" },
    { id: 2, title: "Category 2", image: "image2.jpg" },
    { id: 3, title: "Category 3", image: "image3.jpg" },
  ];
  render(<ProductCategory categories={categories} />);

  const categoryElements = screen.getAllByTestId("category");
  categoryElements.forEach((element, index) => {
    expect(element).toHaveTextContent(categories[index].title);
  });
});

test("should render no category elements", () => {
  render(<ProductCategory categories={[]} />);

  const categoryElements = screen.queryAllByTestId("category");
  expect(categoryElements.length).toBe(0);
});

test("should render a category element with the correct title and image", () => {
  const categories = [{ id: 1, title: "Category 1", image: "image1.jpg" }];
  render(<ProductCategory categories={categories} />);

  const categoryElement = screen.getByTestId("category");
  expect(categoryElement).toBeInTheDocument();
  expect(categoryElement).toHaveTextContent(categories[0].title);
  expect(categoryElement).toHaveAttribute("src", categories[0].image);
});
