import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ChangeOrderStatus from "../../../../src/components/admin/changeOrderStatus/ChangeOrderStatus";

test("Calls updateOrder function on form submission", () => {
  const mockDispatch = jest.fn();
  const mockUpdateOrderStatus = jest.fn();
  const mockUseDispatch = jest
    .spyOn(ReactRedux, "useDispatch")
    .mockReturnValue(mockDispatch);
  const mockUseSelector = jest
    .spyOn(ReactRedux, "useSelector")
    .mockReturnValue({ isLoading: false });
  const mockUseParams = jest
    .spyOn(ReactRouterDOM, "useParams")
    .mockReturnValue({ id: "123" });
  const { container } = render(<ChangeOrderStatus />);
  const form = container.querySelector("form");
  fireEvent.submit(form);
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockUpdateOrderStatus).toHaveBeenCalled();
  mockUseDispatch.mockRestore();
  mockUseSelector.mockRestore();
  mockUseParams.mockRestore();
});

test("Updates status state on select input change", () => {
  const mockDispatch = jest.fn();
  const mockUpdateOrderStatus = jest.fn();
  const mockUseDispatch = jest
    .spyOn(ReactRedux, "useDispatch")
    .mockReturnValue(mockDispatch);
  const mockUseSelector = jest
    .spyOn(ReactRedux, "useSelector")
    .mockReturnValue({ isLoading: false });
  const mockUseParams = jest
    .spyOn(ReactRouterDOM, "useParams")
    .mockReturnValue({ id: "123" });
  const { container } = render(<ChangeOrderStatus />);
  const select = container.querySelector("select");
  fireEvent.change(select, { target: { value: "Processing..." } });
  expect(select.value).toBe("Processing...");
  expect(mockDispatch).not.toHaveBeenCalled();
  expect(mockUpdateOrderStatus).not.toHaveBeenCalled();
  mockUseDispatch.mockRestore();
  mockUseSelector.mockRestore();
  mockUseParams.mockRestore();
});
test("Updates status state on select input change - Shipped", () => {
  const { container } = render(<ChangeOrderStatus />);
  const select = container.querySelector("select");
  fireEvent.change(select, { target: { value: "Shipped" } });
  expect(select.value).toBe("Shipped");
});

test("Updates status state on select input change - Delivered", () => {
  const { container } = render(<ChangeOrderStatus />);
  const select = container.querySelector("select");
  fireEvent.change(select, { target: { value: "Delivered" } });
  expect(select.value).toBe("Delivered");
});
