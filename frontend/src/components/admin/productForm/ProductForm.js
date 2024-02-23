// ! CHILD class -- Exported to `AddProduct.js`
import React, { useEffect, useState } from "react";
import "./ProductForm.scss";
import Card from "../../card/Card";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "./UploadWidget";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const ProductForm = ({
  saveProduct,
  isEditing,
  product,
  setProduct,
  description,
  setDescription,
  files,
  setFiles,
}) => {
  const dispatch = useDispatch();
  const [filteredBrands, setFilteredBrands] = useState([]);
  const { categories, brands } = useSelector((state) => state.category);

  // ! Fetching `categories and brand properties` when the page is refreshed by using "useEffect"
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  // ! (4) Filter brands based on selected category
  const filterBrands = (selectedCategory) => {
    const newBrands = brands.filter(
      (brand) => brand.category === selectedCategory
    );
    setFilteredBrands(newBrands);
  };

  // ! To cast filterBrands function every time it runs
  useEffect(() => {
    filterBrands(product?.category);
  }, [product?.category]);
  /* =======================================  */

  // ! (1) This function is passed in as a prop at <ProductForm />
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // ! This function is PASSED IN as a prop on an icon onClick attribute.
  const removeImage = (image) => {
    setFiles(files.filter((img) => img !== image));
  };

  return (
    <div className="add-product">
      <UploadWidget files={files} setFiles={setFiles} />

      <Card cardClass={"card"}>
        <br />

        <form onSubmit={saveProduct}>
          {/* // ! (9) Product images */}
          <label>Images:</label>
          <div className="slide-container">
            <aside>
              {files.length > 0 &&
                files.map((image) => (
                  <div className="thumbnail" key={image}>
                    <img src={image} alt="productImage" height={100} />
                    <div>
                      <BsTrash
                        size={25}
                        className="thumbnailIcon"
                        onClick={() => removeImage(image)}
                      />
                    </div>
                  </div>
                ))}
              {files.length < 1 && (
                <p className="--m">No image set for this product</p>
              )}
            </aside>
          </div>

          {/* // ! (1) Name: */}
          <label> Name:</label>
          <input
            type="text"
            placeholder="E.g. iPhone 11, Samsung S10 + etc."
            name="name"
            value={product?.name}
            onChange={handleInputChange}
            required
          />

          {/* // ! (2) Category */}
          <label>Category</label>
          {/* Used value={product?.category} to avoid an error if the page is blank */}
          <select
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option value={product?.category}>{product.category}</option>
            ) : (
              <option>Select a category:</option>
            )}
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={categories.name}>
                  {category.name}
                </option>
              ))}
          </select>

          {/* // ! (3) Brand */}
          <label>Brand</label>
          {/* Used value={product?.category} not to throw an error if the page is blank */}
          <select
            name="brand"
            value={product?.brand}
            onChange={handleInputChange}
          >
            {/* >>> option tag below `CANNOT BE DISABLED`, otherwise it will throw bad request 404 
                          although the form from the frontend is all filled */}
            {isEditing ? (
              <option value={product?.brand}>{product.brand}</option>
            ) : (
              <option>Select a brand:</option>
            )}
            {filteredBrands.length > 0 &&
              filteredBrands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
          </select>

          {/*  // ! (4) Colour */}
          <label>Colour</label>
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
            placeholder="E.g. 850, 1000, 1500, 3200 etc."
            name="regularPrice"
            value={product?.regularPrice}
            onChange={handleInputChange}
          />

          {/* // ! (6) Current price */}
          <label>Current Price</label>
          <input
            type="text"
            placeholder="E.g. 750, 900, 1400, 3100 etc."
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          {/* // ! (7) Quantity */}
          <label>Quantity</label>
          <input
            type="text"
            placeholder="E.g. 2, 5, 10 (Maximum of 20)"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          {/* // ! (8) Description */}
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
 * This won't work if these information is placed at the top, MUST AT THE BOTTOM
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
