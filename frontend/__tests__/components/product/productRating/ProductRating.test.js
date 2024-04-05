import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductRating from "../../../../src/components/product/productRating/ProductRating";


test("Renders star ratings and number of ratings", () => {
  const averageRating = 4.5;
  const numberOfRatings = 10;
  render(
    <ProductRating
      averageRating={averageRating}
      numberOfRatings={numberOfRatings}
    />
  );

  const starRatings = screen.getByTestId("star-ratings");
  const ratingCount = screen.getByTestId("rating-count");

  expect(starRatings).toBeInTheDocument();
  expect(ratingCount).toBeInTheDocument();
  expect(starRatings).toHaveAttribute("rating", averageRating.toString());
  expect(ratingCount).toHaveTextContent(`(${numberOfRatings})`);
});

test("Does not render star ratings and number of ratings", () => {
  const averageRating = 0;
  const numberOfRatings = 0;
  render(
    <ProductRating
      averageRating={averageRating}
      numberOfRatings={numberOfRatings}
    />
  );

  const starRatings = screen.queryByTestId("star-ratings");
  const ratingCount = screen.queryByTestId("rating-count");

  expect(starRatings).not.toBeInTheDocument();
  expect(ratingCount).not.toBeInTheDocument();
});

test("Renders star ratings and number of ratings with valid values", () => {
  const averageRating = 4.5;
  const numberOfRatings = 10;
  render(
    <ProductRating
      averageRating={averageRating}
      numberOfRatings={numberOfRatings}
    />
  );

  const starRatings = screen.getByTestId("star-ratings");
  const ratingCount = screen.getByTestId("rating-count");

  expect(starRatings).toBeInTheDocument();
  expect(ratingCount).toBeInTheDocument();
  expect(starRatings).toHaveAttribute("rating", averageRating.toString());
  expect(ratingCount).toHaveTextContent(`(${numberOfRatings})`);
});

test("Renders zero star ratings and zero as the number of ratings", () => {
  const averageRating = 0;
  const numberOfRatings = 0;
  render(
    <ProductRating
      averageRating={averageRating}
      numberOfRatings={numberOfRatings}
    />
  );

  const starRatings = screen.queryByTestId("star-ratings");
  const ratingCount = screen.queryByTestId("rating-count");

  expect(starRatings).not.toBeInTheDocument();
  expect(ratingCount).not.toBeInTheDocument();
});
