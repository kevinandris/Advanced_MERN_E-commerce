import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Register from "../../../src/pages/auth/Register";

test("Name placeholder should be rendered", () => {
  render(<Register />);
  const nameInputEl = screen.getByPlaceholderText(/Name/i);
  expect(nameInputEl).toBeInTheDocument();
});

test("Email placeholder should be rendered", () => {
  render(<Register />);
  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  expect(emailInputEl).toBeInTheDocument();
});

test("Password placeholder should be rendered", () => {
  render(<Register />);
  const passwordInputEl = screen.getByPlaceholderText(/Password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("should register a user successfully", async () => {
  render(<Register />);
  const nameInputEl = screen.getByPlaceholderText(/Name/i);
  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  const passwordInputEl = screen.getByPlaceholderText(/Password/i);
  const cPasswordInputEl = screen.getByPlaceholderText(/Confirm Password/i);
  const registerButtonEl = screen.getByRole("button", { name: /Register/i });

  fireEvent.change(nameInputEl, { target: { value: "John Doe" } });
  fireEvent.change(emailInputEl, { target: { value: "john.doe@example.com" } });
  fireEvent.change(passwordInputEl, { target: { value: "password" } });
  fireEvent.change(cPasswordInputEl, { target: { value: "password" } });

  fireEvent.click(registerButtonEl);

  await waitFor(() => {
    expect(screen.queryByText(/All fields are required/i)).toBeNull();
    expect(
      screen.queryByText(/Password must be up to 6 characters/i)
    ).toBeNull();
    expect(screen.queryByText(/Please enter a valid email/i)).toBeNull();
    expect(screen.queryByText(/Your passwords are not match/i)).toBeNull();
    expect(screen.queryByText(/Register/i)).toBeNull();
  });
});

test("should display an error message for invalid email", async () => {
  render(<Register />);
  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  const registerButtonEl = screen.getByRole("button", { name: /Register/i });

  fireEvent.change(emailInputEl, { target: { value: "invalidemail" } });

  fireEvent.click(registerButtonEl);

  await waitFor(() => {
    expect(screen.getByText(/Please enter a valid email/i)).toBeInTheDocument();
  });
});
