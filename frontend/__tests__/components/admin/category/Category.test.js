import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Category from "../../../../src/components/admin/category/Category";

test("renders Category component with CreateCategory and CategoryList", () => {
  render(<Category />);
  expect(screen.getByTestId("create-category")).toBeInTheDocument();
  expect(screen.getByTestId("category-list")).toBeInTheDocument();
});
