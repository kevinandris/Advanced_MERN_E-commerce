import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "../../../src/components/header/Header";

test("renders correct number of cart items", () => {
  const cartTotalQuantity = 5;
  const selectCartTotalQuantity = jest.fn().mockReturnValue(cartTotalQuantity);
  useSelector.mockImplementation((selector) => selector({ cartTotalQuantity }));

  render(<Header />);

  const cartItems = screen.getByText(cartTotalQuantity.toString());
  expect(cartItems).toBeInTheDocument();
});

test("calls logout function and navigates to login page", async () => {
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);

  render(<Header />);

  const logoutButton = screen.getByText("Logout");
  fireEvent.click(logoutButton);

  await waitFor(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(logout());
    expect(dispatch).toHaveBeenCalledWith(RESET_AUTH());
    expect(navigate).toHaveBeenCalledWith("/login");
  });
});

test("renders header component with scrollPage state set to true", () => {
  const { container } = render(<Header />);
  const header = container.querySelector("header");
  expect(header).toHaveClass("fixed");
});

test("clicks on the Shop link in the header and verifies the navigation", () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);

  render(<Header />);

  const shopLink = screen.getByText("Shop");
  fireEvent.click(shopLink);

  expect(navigate).toHaveBeenCalledWith("/shop");
});
