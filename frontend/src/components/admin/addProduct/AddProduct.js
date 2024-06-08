import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import ProductForm from "../productForm/ProductForm";
import "./AddProduct.scss";
import {
  RESET_PROD,
  createProduct,
} from "../../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";

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
  const { isLoading, message } = useSelector((state) => state.product);
  const {
    name,
    category,
    brand,
    price,
    quantity,
    color,
    regularPrice,
  } = product;

  /* >>> (3) This function is passed in to `saveProduct function` */
  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  /*  >>> (2) This function is passed in as a prop at <ProductForm /> | console.log(product); console.log(description); */
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
  };

  /* >>> To check if a product is created or not before navigating the admin */
  useEffect(() => {
    if (message === "Product created successfully") {
      navigate("/admin/all-product");
    }
    dispatch(RESET_PROD());
  }, [message, navigate, dispatch]);

  return (
    <section>
      <div className="container">
        {isLoading && <Loader />}
        <h3 className="--mB">Add New Product</h3>

        <ProductForm
          saveProduct={saveProduct}
          product={product}
          setProduct={setProduct}
          isEditing={false}
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
