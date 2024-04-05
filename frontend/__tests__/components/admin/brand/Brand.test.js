import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Brand from "../../../../src/components/admin/brand/Brand";

test("asd", () => {
  render(<Brand />);
});

test("renders CreateBrand component", () => {
  render(<Brand />);
  expect(screen.getByTestId("create-brand")).toBeInTheDocument();
});

test("renders BrandList component", () => {
  render(<Brand />);
  expect(screen.getByTestId("brand-list")).toBeInTheDocument();
});
