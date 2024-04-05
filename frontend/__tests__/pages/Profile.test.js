import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Profile from "../../src/pages/profile/Profile";

test("Displays user's name", () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    role: "user",
    photo: "profile.jpg",
    address: {
      address: "123 Main St",
      state: "CA",
      country: "USA",
    },
  };
  render(<Profile />, { initialState: { auth: { isLoading: false, user } } });
  expect(screen.getByLabelText("Name:")).toHaveValue("John Doe");
});

test("Updates user's name", () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    role: "user",
    photo: "profile.jpg",
    address: {
      address: "123 Main St",
      state: "CA",
      country: "USA",
    },
  };
  render(<Profile />, { initialState: { auth: { isLoading: false, user } } });
  const nameInput = screen.getByLabelText("Name:");
  fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
  expect(nameInput).toHaveValue("Jane Doe");
});

test("Displays user's phone number", () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    role: "user",
    photo: "profile.jpg",
    address: {
      address: "123 Main St",
      state: "CA",
      country: "USA",
    },
  };
  render(<Profile />, { initialState: { auth: { isLoading: false, user } } });
  expect(screen.getByLabelText("Phone:")).toHaveValue("1234567890");
});

test("Saves profile with empty address field", async () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    role: "user",
    photo: "profile.jpg",
    address: {
      address: "",
      state: "",
      country: "",
    },
  };
  render(<Profile />, { initialState: { auth: { isLoading: false, user } } });
  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);
  await waitFor(() => {
    expect(dispatch).toHaveBeenCalledWith(
      updateUser({
        name: "John Doe",
        phone: "1234567890",
        address: { address: "", state: "", country: "" },
      })
    );
  });
});
