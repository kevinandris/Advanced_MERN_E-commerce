import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";

describe("renders app component", () => {
  it("renders header component", () => {
    render(<App />);
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders footer component", () => {
    render(<App />);
    const footerElement = screen.getByTestId("footer");
    expect(footerElement).toBeInTheDocument();
  });

  it("dispatchGetLoginStatusUpdatesState", () => {
    const dispatchMock = jest.fn();
    useSelector.mockReturnValue({ isLoggedIn: true, user: null });
    useDispatch.mockReturnValue(dispatchMock);

    render(<App />);

    expect(dispatchMock).toHaveBeenCalledWith(getLoginStatus());
  });

  it("dispatchGetUserUpdatesState", () => {
    const dispatchMock = jest.fn();
    useSelector.mockReturnValue({ isLoggedIn: true, user: null });
    useDispatch.mockReturnValue(dispatchMock);

    render(<App />);

    expect(dispatchMock).toHaveBeenCalledWith(getUser());
  });
});
