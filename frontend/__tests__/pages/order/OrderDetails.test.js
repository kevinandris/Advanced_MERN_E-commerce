import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import OrderDetails from "../../../src/pages/order/OrderDetails";

test("dispatches getOrder action with correct id", () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  useParams.mockReturnValue({ id: "123" });
  render(<OrderDetails />);
  expect(mockDispatch).toHaveBeenCalledWith(getOrder("123"));
});

test("does not dispatch getOrder action if id is not provided", () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  useParams.mockReturnValue({});
  render(<OrderDetails />);
  expect(mockDispatch).not.toHaveBeenCalled();
});

test("does not dispatch getOrder action if id is not provided", () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  useParams.mockReturnValue({});
  render(<OrderDetails />);
  expect(mockDispatch).not.toHaveBeenCalled();
});

test("fails to generate PDF invoice if image data is invalid", () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  useParams.mockReturnValue({ id: "123" });
  render(<OrderDetails />);
  const downloadButton = screen.getByText("Download PDF");
  fireEvent.click(downloadButton);
  expect(mockDispatch).toHaveBeenCalledWith(getOrder("123"));
  // TODO: Add assertion for invalid image data
});
