import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Footer from "../../../src/components/footer/Footer";

test("Displays the correct year in the footer", () => {
  render(<Footer />);
  const year = new Date().getFullYear();
  expect(screen.getByText(`© ${year} All Rights Reserved`)).toBeInTheDocument();
});

test("Has the correct class name", () => {
  render(<Footer />);
  expect(screen.getByTestId("footer")).toHaveClass("footer");
});


