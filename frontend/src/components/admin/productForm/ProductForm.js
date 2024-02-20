// ! CHILD class -- Exported to AddProduct.js
import React from "react";
import "./ProductForm.scss";
import Card from "../../card/Card";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProductForm = ({
  saveProduct,
  product,
  handleInputChange,
  categories,
  isEditing,
  filteredBrands,
  description,
  setDescription,
}) => {
  return (
    <div className="add-product">
      <h3>Upload Widget Placeholder</h3>

      <Card cardClass={"card"}>
        <br />

        <form onSubmit={saveProduct}>
          {/* // ! (1) Name */}
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="E.g. iPhone 11, Samsung S10 + etc."
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          {/* // ! (2) Category */}
          <label>Product Category</label>
          {/* Used value={product?.category} to avoid an error if the page is blank */}
          <select
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option value={product?.category}>{product.category}</option>
            ) : (
              <option>Select Category</option>
            )}
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={categories.name}>
                  {category.name}
                </option>
              ))}
          </select>

          {/* // ! (3) Brand */}
          <label>Product Brand</label>
          {/* Used value={product?.category} not to throw an error if the page is blank */}
          <select
            name="brand"
            value={product?.brand}
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option value={product?.brand}>{product.brand}</option>
            ) : (
              <option>Select Brand</option>
            )}
            {filteredBrands.length > 0 &&
              filteredBrands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
          </select>

          {/*  // ! (4) Colour */}
          <label>Product Colour</label>
          <input
            type="text"
            placeholder="E.g. red, white, purple, black etc."
            name="color"
            value={product?.color}
            onChange={handleInputChange}
          />

          {/* // ! (5) Regular price */}
          <label>Regular Price</label>
          <input
            type="text"
            placeholder="E.g. 20, 100, 150, 320 etc."
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          {/* // ! (6) Quantity */}
          <label>Product Quantity</label>
          <input
            type="text"
            placeholder="E.g. 2, 5, 10 (Maximum of 20)"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          {/* // ! (7) Description */}
          <label>Product Description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

/*
 * https://www.npmjs.com/package/react-quill
 */
ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

export default ProductForm;
