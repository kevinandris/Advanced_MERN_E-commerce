import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "../../../src/pages/home/Home";

test("asd", () => {
  render(<Home />);
});

test("Dispatches getProducts action on mount", () => {
  const dispatchMock = jest.fn();
  useDispatch.mockReturnValue(dispatchMock);

  render(<Home />);

  expect(dispatchMock).toHaveBeenCalledWith(getProducts());
});

test("Renders latest products carousel", () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      image: ["image1.jpg"],
      price: 10,
      regularPrice: 15,
      description: "Description 1",
      quantity: 5,
    },
    {
      id: 2,
      name: "Product 2",
      image: ["image2.jpg"],
      price: 20,
      regularPrice: 25,
      description: "Description 2",
      quantity: 3,
    },
    {
      id: 3,
      name: "Product 3",
      image: ["image3.jpg"],
      price: 30,
      regularPrice: 35,
      description: "Description 3",
      quantity: 7,
    },
  ];
  useSelector.mockReturnValue({ products });

  render(<Home />);

  const carouselItems = screen.getAllByTestId("carousel-item");
  expect(carouselItems).toHaveLength(3);
});

test("Renders phone products carousel", () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      image: ["image1.jpg"],
      price: 10,
      regularPrice: 15,
      description: "Description 1",
      quantity: 5,
      category: "Phone",
    },
    {
      id: 2,
      name: "Product 2",
      image: ["image2.jpg"],
      price: 20,
      regularPrice: 25,
      description: "Description 2",
      quantity: 3,
      category: "Phone",
    },
    {
      id: 3,
      name: "Product 3",
      image: ["image3.jpg"],
      price: 30,
      regularPrice: 35,
      description: "Description 3",
      quantity: 7,
      category: "Phone",
    },
  ];
  useSelector.mockReturnValue({ products });

  render(<Home />);

  const carouselItems = screen.getAllByTestId("carousel-item");
  expect(carouselItems).toHaveLength(3);
});

test("Renders phone products carousel", () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      image: ["image1.jpg"],
      price: 10,
      regularPrice: 15,
      description: "Description 1",
      quantity: 5,
      category: "Phone",
    },
    {
      id: 2,
      name: "Product 2",
      image: ["image2.jpg"],
      price: 20,
      regularPrice: 25,
      description: "Description 2",
      quantity: 3,
      category: "Phone",
    },
    {
      id: 3,
      name: "Product 3",
      image: ["image3.jpg"],
      price: 30,
      regularPrice: 35,
      description: "Description 3",
      quantity: 7,
      category: "Phone",
    },
  ];
  useSelector.mockReturnValue({ products });

  render(<Home />);

  const carouselItems = screen.getAllByTestId("carousel-item");
  expect(carouselItems).toHaveLength(3);
});

test("Does not render any products in the phone products carousel when there are no phone products available", () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      image: ["image1.jpg"],
      price: 10,
      regularPrice: 15,
      description: "Description 1",
      quantity: 5,
      category: "Laptop",
    },
    {
      id: 2,
      name: "Product 2",
      image: ["image2.jpg"],
      price: 20,
      regularPrice: 25,
      description: "Description 2",
      quantity: 3,
      category: "Laptop",
    },
    {
      id: 3,
      name: "Product 3",
      image: ["image3.jpg"],
      price: 30,
      regularPrice: 35,
      description: "Description 3",
      quantity: 7,
      category: "Laptop",
    },
  ];
  useSelector.mockReturnValue({ products });

  render(<Home />);

  const carouselItems = screen.queryAllByTestId("carousel-item");
  expect(carouselItems).toHaveLength(0);
});
