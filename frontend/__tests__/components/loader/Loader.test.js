import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Loader from "../../../src/components/loader/Loader";


test("should render Loader component with correct class name", () => {
  render(<Loader />);
  const loaderElement = screen.getByTestId("loader");
  expect(loaderElement).toHaveClass("loader");
});

test("should render Loader component with loading image", () => {
  render(<Loader />);
  const imageElement = screen.getByAltText("loading");
  expect(imageElement).toBeInTheDocument();
});

test("should attach Loader component to the 'loader' element in the DOM", () => {
  const loaderElement = document.createElement("div");
  loaderElement.setAttribute("id", "loader");
  document.body.appendChild(loaderElement);

  render(<Loader />);

  const portalElement = screen.getByTestId("loader");
  expect(portalElement.parentElement).toBe(loaderElement);
});

test("should unmount Loader component correctly", () => {
  const { unmount } = render(<Loader />);
  unmount();

  const portalElement = document.getElementById("loader");
  expect(portalElement).toBeNull();
});
