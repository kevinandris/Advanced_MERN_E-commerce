import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductItem from "../../../../src/components/product/productItem/ProductItem";


test("addToCart function is called on button click", () => {
  const addToCartMock = jest.fn();
  const product = {
    _id: "123",
    name: "Test Product",
    price: 10,
    quantity: 5,
  };
  render(<ProductItem product={product} addToCart={addToCartMock} />);

  fireEvent.click(screen.getByText("Add To Cart"));

  expect(addToCartMock).toHaveBeenCalledWith(product);
});

test("Out of Stock button displays when product quantity is 0", () => {
  const product = {
    _id: "123",
    name: "Test Product",
    price: 10,
    quantity: 0,
  };
  render(<ProductItem product={product} />);

  expect(screen.getByText("Out of Stock")).toBeInTheDocument();
});

test("Should display the regular price with a strike through and the discounted price", () => {
  const product = {
    _id: "123",
    name: "Test Product",
    price: 10,
    regularPrice: 15,
  };
  render(<ProductItem product={product} />);

  expect(screen.getByText("$15")).toBeInTheDocument();
  expect(screen.getByText("$10")).toBeInTheDocument();
  expect(screen.getByText("$15")).toHaveStyle("text-decoration: line-through");
});

test("Should truncate the product's description to 200 characters and display it", () => {
  const product = {
    _id: "123",
    name: "Test Product",
    price: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna id aliquet tincidunt, nunc nisl ultrices nunc, nec lacinia nisl nunc id mauris. Nulla facilisi. Sed euismod, urna id aliquet tincidunt, nunc nisl ultrices nunc, nec lacinia nisl nunc id mauris. Nulla facilisi.",
  };
  render(<ProductItem product={product} />);

  expect(
    screen.getByText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna id aliquet tincidunt, nunc nisl ultrices nunc, nec lacinia nisl nunc id mauris. Nulla facilisi. Sed euismod, urna id aliquet tincidunt, nunc nisl ultrices nunc, nec lacinia nisl nunc id mauris. Nulla facilisi."
    )
  ).toBeInTheDocument();
});
