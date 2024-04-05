import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Card from "../../../src/components/card/Card";

test("Renders a card component with children", () => {
  render(<Card>Test Children</Card>);
  expect(screen.getByText("Test Children")).toBeInTheDocument();
});

test("Applies the provided cardClass to the card component", () => {
  render(<Card cardClass="custom-class" />);
  expect(screen.getByTestId("card")).toHaveClass("custom-class");
});

test("Renders a card without any prop", () => {
  render(<Card />);
  expect(screen.getByTestId("card")).toBeInTheDocument();
});

test("Renders a card with null as children prop", () => {
  render(<Card children={null} />);
  expect(screen.getByTestId("card")).toBeInTheDocument();
});
