import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../../../src/pages/auth/Login";

test("Email placeholder should be rendered", () => {
  render(<Login />);
  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  expect(emailInputEl).toBeInTheDocument();
});

test("Password placeholder should be rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/Password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("Login button should be disabled when fields are empty", () => {
  render(<Login />);
  const loginButtonEl = screen.getByRole("button", { name: /Login/i });
  expect(loginButtonEl).toBeDisabled();

  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  fireEvent.change(emailInputEl, { target: { value: "test@example.com" } });
  expect(loginButtonEl).toBeDisabled();

  const passwordInputEl = screen.getByPlaceholderText(/Password/i);
  fireEvent.change(passwordInputEl, { target: { value: "password123" } });
  expect(loginButtonEl).not.toBeDisabled();
});

test("User login with valid credentials", async () => {
  render(<Login />);
  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  const passwordInputEl = screen.getByPlaceholderText(/Password/i);
  const loginButtonEl = screen.getByRole("button", { name: /Login/i });

  fireEvent.change(emailInputEl, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInputEl, { target: { value: "password123" } });

  expect(loginButtonEl).not.toBeDisabled();

  fireEvent.click(loginButtonEl);

  await waitFor(() => {
    expect(screen.queryByText("All fields are required")).toBeNull();
    expect(screen.queryByText("Please enter a valid email")).toBeNull();
    expect(screen.queryByText("Login")).toBeNull();
  });

  // Add assertions for the success scenario
});

test("User login with empty credentials", async () => {
  render(<Login />);
  const loginButtonEl = screen.getByRole("button", { name: /Login/i });

  fireEvent.click(loginButtonEl);

  await waitFor(() => {
    expect(screen.getByText("All fields are required")).toBeInTheDocument();
  });
});
