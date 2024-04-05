import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ReviewProduct from "../../src/pages/reviewProduct/ReviewProduct";

test("Submits review with rating and review text", async () => {
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();
  const useDispatchMock = jest
    .spyOn(redux, "useDispatch")
    .mockReturnValue(dispatchMock);
  const useNavigateMock = jest
    .spyOn(router, "useNavigate")
    .mockReturnValue(navigateMock);
  const useSelectorMock = jest
    .spyOn(redux, "useSelector")
    .mockReturnValue({ isLoading: false, product: { ratings: [] } });
  const useParamsMock = jest
    .spyOn(router, "useParams")
    .mockReturnValue({ id: "123" });
  const useStateMock = jest.spyOn(React, "useState");
  useStateMock.mockImplementation((initialValue) => [initialValue, jest.fn()]);

  render(<ReviewProduct />);

  fireEvent.change(screen.getByLabelText("Star Rating"), {
    target: { value: 5 },
  });
  fireEvent.change(screen.getByLabelText("Review"), {
    target: { value: "Great product!" },
  });
  fireEvent.click(screen.getByText("Submit"));

  await waitFor(() => {
    expect(dispatchMock).toHaveBeenCalledWith(
      reviewProduct({
        id: "123",
        formData: { star: 5, review: "Great product!" },
      })
    );
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });

  useDispatchMock.mockRestore();
  useNavigateMock.mockRestore();
  useSelectorMock.mockRestore();
  useParamsMock.mockRestore();
  useStateMock.mockRestore();
});

test("Displays error toast when submitting review without rating or review text", async () => {
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();
  const useDispatchMock = jest
    .spyOn(redux, "useDispatch")
    .mockReturnValue(dispatchMock);
  const useNavigateMock = jest
    .spyOn(router, "useNavigate")
    .mockReturnValue(navigateMock);
  const useSelectorMock = jest
    .spyOn(redux, "useSelector")
    .mockReturnValue({ isLoading: false, product: { ratings: [] } });
  const useParamsMock = jest
    .spyOn(router, "useParams")
    .mockReturnValue({ id: "123" });
  const useStateMock = jest.spyOn(React, "useState");
  useStateMock.mockImplementation((initialValue) => [initialValue, jest.fn()]);

  render(<ReviewProduct />);

  fireEvent.click(screen.getByText("Submit"));

  await waitFor(() => {
    expect(
      screen.getByText("Please enter rating and review")
    ).toBeInTheDocument();
  });

  useDispatchMock.mockRestore();
  useNavigateMock.mockRestore();
  useSelectorMock.mockRestore();
  useParamsMock.mockRestore();
  useStateMock.mockRestore();
});

test("Edits a product review with valid input", async () => {
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();
  const useDispatchMock = jest
    .spyOn(redux, "useDispatch")
    .mockReturnValue(dispatchMock);
  const useNavigateMock = jest
    .spyOn(router, "useNavigate")
    .mockReturnValue(navigateMock);
  const useSelectorMock = jest
    .spyOn(redux, "useSelector")
    .mockReturnValue({ isLoading: false, product: { ratings: [] } });
  const useParamsMock = jest
    .spyOn(router, "useParams")
    .mockReturnValue({ id: "123" });
  const useStateMock = jest.spyOn(React, "useState");
  useStateMock.mockImplementation((initialValue) => [initialValue, jest.fn()]);

  render(<ReviewProduct />);

  fireEvent.click(screen.getByText("Edit"));

  fireEvent.change(screen.getByLabelText("Star Rating"), {
    target: { value: 4 },
  });
  fireEvent.change(screen.getByLabelText("Review"), {
    target: { value: "Updated review!" },
  });
  fireEvent.click(screen.getByText("Save"));

  await waitFor(() => {
    expect(dispatchMock).toHaveBeenCalledWith(
      updateReview({
        id: "123",
        formData: { star: 4, review: "Updated review!" },
      })
    );
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });

  useDispatchMock.mockRestore();
  useNavigateMock.mockRestore();
  useSelectorMock.mockRestore();
  useParamsMock.mockRestore();
  useStateMock.mockRestore();
});

test("Deletes a product review", async () => {
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();
  const useDispatchMock = jest
    .spyOn(redux, "useDispatch")
    .mockReturnValue(dispatchMock);
  const useNavigateMock = jest
    .spyOn(router, "useNavigate")
    .mockReturnValue(navigateMock);
  const useSelectorMock = jest
    .spyOn(redux, "useSelector")
    .mockReturnValue({ isLoading: false, product: { ratings: [] } });
  const useParamsMock = jest
    .spyOn(router, "useParams")
    .mockReturnValue({ id: "123" });
  const useStateMock = jest.spyOn(React, "useState");
  useStateMock.mockImplementation((initialValue) => [initialValue, jest.fn()]);

  render(<ReviewProduct />);

  fireEvent.click(screen.getByText("Delete"));

  await waitFor(() => {
    expect(dispatchMock).toHaveBeenCalledWith(
      deleteReview({ id: "123", formData: { userID: undefined } })
    );
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });

  useDispatchMock.mockRestore();
  useNavigateMock.mockRestore();
  useSelectorMock.mockRestore();
  useParamsMock.mockRestore();
  useStateMock.mockRestore();
});
