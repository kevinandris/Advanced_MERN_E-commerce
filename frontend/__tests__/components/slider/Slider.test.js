import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Slider from "../../../src/components/slider/Slider";

test("Navigates to previous slide", () => {
  render(<Slider />);
  const prevArrow = screen.getByTestId("prev-arrow");
  fireEvent.click(prevArrow);
  const currentSlide = screen.getByTestId("current-slide");
  expect(currentSlide).toHaveClass("slide current");
});

test("Navigates to next slide", () => {
  render(<Slider />);
  const nextArrow = screen.getByTestId("next-arrow");
  fireEvent.click(nextArrow);
  const currentSlide = screen.getByTestId("current-slide");
  expect(currentSlide).toHaveClass("slide current");
});

test("Auto-scrolling stops when user manually navigates to a slide", () => {
  render(<Slider />);
  const nextArrow = screen.getByTestId("next-arrow");
  fireEvent.click(nextArrow);
  const currentSlide = screen.getByTestId("current-slide");
  expect(currentSlide).toHaveClass("slide current");
  clearInterval(slideInterval);
});

test("Auto-scrolling resumes after navigating to a slide", async () => {
  render(<Slider />);
  const nextArrow = screen.getByTestId("next-arrow");
  fireEvent.click(nextArrow);
  await waitFor(() => {
    const currentSlide = screen.getByTestId("current-slide");
    expect(currentSlide).toHaveClass("slide current");
  });
  await waitFor(
    () => {
      const currentSlide = screen.getByTestId("current-slide");
      expect(currentSlide).toHaveClass("slide current");
    },
    { timeout: intervalTime + 1000 }
  );
});
