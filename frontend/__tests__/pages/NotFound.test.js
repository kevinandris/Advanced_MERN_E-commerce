import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NotFound from "../../src/pages/404/NotFound";

test("Heading text should be 'Page Not Found'", () => {
  render(<NotFound />);
  const headingEl = screen.getByRole("heading", { level: 2 });
  expect(headingEl).toHaveTextContent("Page Not Found");
});

test("Button text should be 'Back to home'", () => {
  render(<NotFound />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toHaveTextContent("Back to home");
});

test("Page Not Found message should be rendered correctly", () => {
  render(<NotFound />);
  const messageEl = screen.getByText(
    "Looks like the page you are looking for could not be found."
  );
  expect(messageEl).toBeInTheDocument();
});

test("Instruction message should be rendered correctly", () => {
  render(<NotFound />);
  const instructionEl = screen.getByText("Back to home");
  s;
  expect(instructionEl).toBeInTheDocument();
});
