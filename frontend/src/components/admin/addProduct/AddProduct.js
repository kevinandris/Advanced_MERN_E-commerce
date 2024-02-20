import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import ProductForm from "../productForm/ProductForm";
import "./AddProduct.scss";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

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
  const [product, setProduct] = useState(initialState);
  const [description, setDescription] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const { isLoading } = useSelector((state) => state.product);
  const { categories, brands } = useSelector((state) => state.category);
  const { name, category, brand, price, quantity, color, regularPrice } =
    product;

  // ! fetching `categories and brand properties` when the page is refreshed by using "useEffect"
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

  // ! to cast filterBrands function every time it runs
  useEffect(() => {
    filterBrands(category);
  }, [category]);

  // ! This function is passed in as a prop at <ProductForm />
  const saveProduct = async (e) => {
    e.preventDefault();
    console.log(product);
    console.log(description);
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
        />
      </div>
    </section>
  );
};

export default AddProduct;
