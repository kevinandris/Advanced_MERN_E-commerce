import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "../../../../src/components/checkout/checkoutForm/CheckoutForm";


test("Displays correct input fields", () => {
  render(<CheckoutForm />);
  expect(screen.getByLabelText("First Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Address")).toBeInTheDocument();
  expect(screen.getByLabelText("City")).toBeInTheDocument();
  expect(screen.getByLabelText("State")).toBeInTheDocument();
  expect(screen.getByLabelText("Zip")).toBeInTheDocument();
});

test("Submits form on button click", async () => {
  render(<CheckoutForm />);
  fireEvent.change(screen.getByLabelText("First Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText("Last Name"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Address"), {
    target: { value: "123 Main St" },
  });
  fireEvent.change(screen.getByLabelText("City"), {
    target: { value: "New York" },
  });
  fireEvent.change(screen.getByLabelText("State"), { target: { value: "NY" } });
  fireEvent.change(screen.getByLabelText("Zip"), {
    target: { value: "10001" },
  });
  fireEvent.click(screen.getByText("Submit"));
  await waitFor(() => {
    expect(screen.getByText("Form submitted successfully")).toBeInTheDocument();
  });
});

test("Validates required fields", () => {
  render(<CheckoutForm />);
  fireEvent.click(screen.getByText("Submit"));
  expect(screen.getByText("First Name is required")).toBeInTheDocument();
  expect(screen.getByText("Last Name is required")).toBeInTheDocument();
  expect(screen.getByText("Email is required")).toBeInTheDocument();
  expect(screen.getByText("Address is required")).toBeInTheDocument();
  expect(screen.getByText("City is required")).toBeInTheDocument();
  expect(screen.getByText("State is required")).toBeInTheDocument();
  expect(screen.getByText("Zip is required")).toBeInTheDocument();
});

test("Submits form with empty fields", async () => {
  render(<CheckoutForm />);
  fireEvent.click(screen.getByText("Submit"));
  await waitFor(() => {
    expect(screen.getByText("Form submitted successfully")).toBeInTheDocument();
  });
});
