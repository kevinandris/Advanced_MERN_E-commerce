import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Wishlist from "../../src/pages/wishlist/Wishlist";

test("asd", () => {
  render(<Wishlist />);
});

test("Displays loader when isLoading is true", () => {
  render(<Wishlist />);
  expect(screen.getByTestId("loader")).toBeInTheDocument();
});

test("Displays message when wishlist is empty", () => {
  render(<Wishlist />);
  expect(
    screen.getByText("No product found in your wishlist")
  ).toBeInTheDocument();
});

test("Toggling between grid and list view updates the styles of the product items", () => {
  render(<Wishlist />);

  // Initial render with grid view
  expect(screen.getByTestId("grid-view")).toBeInTheDocument();
  expect(screen.queryByTestId("list-view")).not.toBeInTheDocument();
  expect(screen.queryByTestId("product-item-grid")).toBeInTheDocument();
  expect(screen.queryByTestId("product-item-list")).not.toBeInTheDocument();

  // Toggle to list view
  fireEvent.click(screen.getByTestId("toggle-view"));
  expect(screen.queryByTestId("grid-view")).not.toBeInTheDocument();
  expect(screen.getByTestId("list-view")).toBeInTheDocument();
  expect(screen.queryByTestId("product-item-grid")).not.toBeInTheDocument();
  expect(screen.queryByTestId("product-item-list")).toBeInTheDocument();

  // Toggle back to grid view
  fireEvent.click(screen.getByTestId("toggle-view"));
  expect(screen.getByTestId("grid-view")).toBeInTheDocument();
  expect(screen.queryByTestId("list-view")).not.toBeInTheDocument();
  expect(screen.queryByTestId("product-item-grid")).toBeInTheDocument();
  expect(screen.queryByTestId("product-item-list")).not.toBeInTheDocument();
});

test("Dispatching removeWishlist with a valid product object removes the product from the wishlist", async () => {
  const product = { _id: "123" };
  const removeFromWishlist = jest.fn();
  const getWishlist = jest.fn();
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);
  useSelector.mockReturnValue({ wishlist: [product], isLoading: false });

  render(<Wishlist />);

  // Click remove button
  fireEvent.click(screen.getByText("Remove from wishlist"));

  // Check if removeWishlist and getWishlist are called with the correct arguments
  expect(removeFromWishlist).toHaveBeenCalledWith(product._id);
  expect(getWishlist).toHaveBeenCalled();

  // Check if dispatch is called with the correct actions
  await waitFor(() => {
    expect(dispatch).toHaveBeenCalledWith(removeFromWishlist(product._id));
    expect(dispatch).toHaveBeenCalledWith(getWishlist());
  });
});
