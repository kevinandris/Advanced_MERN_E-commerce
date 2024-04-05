import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UploadWidget from "../../../../src/components/admin/productForm/UploadWidget";


test("Adds selected images to state", () => {
  render(<UploadWidget />);
  const input = screen.getByLabelText("Click to upload up to 5 images");
  const file1 = new File(["image1"], "image1.png", { type: "image/png" });
  const file2 = new File(["image2"], "image2.png", { type: "image/png" });
  fireEvent.change(input, { target: { files: [file1, file2] } });
  expect(screen.getByAltText("productImage")).toBeInTheDocument();
  expect(screen.getByAltText("productImage").src).toContain("image1");
  expect(screen.getByAltText("productImage").src).toContain("image2");
});

test("Removes selected images from state", () => {
  render(<UploadWidget />);
  const input = screen.getByLabelText("Click to upload up to 5 images");
  const file1 = new File(["image1"], "image1.png", { type: "image/png" });
  const file2 = new File(["image2"], "image2.png", { type: "image/png" });
  fireEvent.change(input, { target: { files: [file1, file2] } });
  const removeButton = screen.getByRole("button", { name: "Remove Image" });
  fireEvent.click(removeButton);
  expect(screen.queryByAltText("productImage")).not.toBeInTheDocument();
});

test("Uploading images", async () => {
  render(<UploadWidget />);
  const input = screen.getByLabelText("Click to upload up to 5 images");
  const file1 = new File(["image1"], "image1.png", { type: "image/png" });
  const file2 = new File(["image2"], "image2.png", { type: "image/png" });
  fireEvent.change(input, { target: { files: [file1, file2] } });
  const uploadButton = screen.getByRole("button", { name: "Upload Images" });
  fireEvent.click(uploadButton);
  await waitFor(() => {
    expect(screen.getByText("Image upload completed.")).toBeInTheDocument();
    expect(screen.queryByAltText("productImage")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Click to upload up to 5 images").value).toBe(
      ""
    );
  });
});

test("Displaying upload error message", async () => {
  render(<UploadWidget />);
  const input = screen.getByLabelText("Click to upload up to 5 images");
  const file1 = new File(["image1"], "image1.png", { type: "image/png" });
  const file2 = new File(["image2"], "image2.png", { type: "image/png" });
  fireEvent.change(input, { target: { files: [file1, file2] } });
  const uploadButton = screen.getByRole("button", { name: "Upload Images" });
  fireEvent.click(uploadButton);
  await waitFor(() => {
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });
});
