import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import ProductForm from "../productForm/ProductForm";
import "./AddProduct.scss";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { createProduct } from "../../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  category: "",
  brand: "",
  quantity: "",
  color: "",
  price: "",
  regularPrice: "",
};
const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const { isLoading } = useSelector((state) => state.product);
  const { categories, brands } = useSelector((state) => state.category);
  const { name, category, brand, price, quantity, color, regularPrice } =
    product;

  // ! Fetching `categories and brand properties` when the page is refreshed by using "useEffect"
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  // ! Filter brands based on selected category
  const filterBrands = (selectedCategory) => {
    const newBrands = brands.filter(
      (brand) => brand.category === selectedCategory
    );
    setFilteredBrands(newBrands);
  };

  // ! To cast filterBrands function every time it runs
  useEffect(() => {
    filterBrands(category);
  }, [category]);

  // ! This function is passed in to `saveProduct function` */
  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  // ! This function is passed in as a prop at <ProductForm /> | console.log(product); console.log(description);
  const saveProduct = async (e) => {
    e.preventDefault();

    /* >>> Validation - an admin can only upload if there is at least 1 image */
    if (files.length < 1) {
      return toast.error("Please add an image");
    }

    const formData = {
      name,
      sku: generateSKU(category),
      category,
      brand,
      color,
      quantity: Number(quantity),
      regularPrice,
      price,
      description,
      image: files,
    };

    // console.log(formData);
    await dispatch(createProduct(formData));

    navigate("/admin/all-product");
  };

  // ! This function is passed in as a prop at <ProductForm />
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <section>
      <div className="container">
        {isLoading && <Loader />}
        <h3 className="--mB">Add New Product</h3>

        <ProductForm
          saveProduct={saveProduct}
          product={product}
          handleInputChange={handleInputChange}
          categories={categories}
          isEditing={false}
          filteredBrands={filteredBrands}
          description={description}
          setDescription={setDescription}
          files={files}
          setFiles={setFiles}
        />
      </div>
    </section>
  );
};

export default AddProduct;
