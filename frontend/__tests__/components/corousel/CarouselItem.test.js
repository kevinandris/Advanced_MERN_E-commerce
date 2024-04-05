import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CarouselItem from "../../../src/components/corousel/CarouselItem";

test("Displays correct price", () => {
  const product = {
    _id: "123",
    url: "image.jpg",
    name: "Product Name",
    price: 10,
    regularPrice: 15,
    description: "Product Description",
  };
  render(<CarouselItem product={product} />);

  const priceElement = screen.getByText("$10");
  const regularPriceElement = screen.getByText("$15");

  expect(priceElement).toBeInTheDocument();
  expect(regularPriceElement).toBeInTheDocument();
});

test("Add To Cart button triggers addToCart function", () => {
  const product = {
    _id: "123",
    url: "image.jpg",
    name: "Product Name",
    price: 10,
    regularPrice: 15,
    description: "Product Description",
  };
  const addToCartMock = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => jest.fn(),
  }));
  jest.mock("../../../src/actions/cartActions", () => ({
    ADD_TO_CART: jest.fn(),
  }));
  jest.mock("../../../src/actions/cartActions", () => ({
    saveCartDB: jest.fn(),
  }));

  render(<CarouselItem product={product} />);

  const addToCartButton = screen.getByText("Add To Cart");
  fireEvent.click(addToCartButton);

  expect(addToCartMock).toHaveBeenCalledTimes(1);
});

test("Displaying product image with valid URL", () => {
  const product = {
    _id: "123",
    url: "image.jpg",
    name: "Product Name",
    price: 10,
    regularPrice: 15,
    description: "Product Description",
  };
  render(<CarouselItem product={product} />);

  const imageElement = screen.getByAltText("product");

  expect(imageElement).toBeInTheDocument();
});

test("Displaying product name with a long name", () => {
  const product = {
    _id: "123",
    url: "image.jpg",
    name: "This is a very long product name that exceeds the character limit",
    price: 10,
    regularPrice: 15,
    description: "Product Description",
  };
  render(<CarouselItem product={product} />);

  const nameElement = screen.getByText(
    "This is a very long product name that exceeds the character limit"
  );

  expect(nameElement).toBeInTheDocument();
});
