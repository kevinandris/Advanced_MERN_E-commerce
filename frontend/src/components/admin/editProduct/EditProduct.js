import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../../redux/features/product/productSlice";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import ProductForm from "../productForm/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(selectIsLoading);
  const editProduct = useSelector(selectProduct);
  const [product, setProduct] = useState(editProduct);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  /* >>> This function is passed in as a prop at <ProductForm /> | console.loGg(product); console.log(description); */
  const saveProduct = async (e) => {
    e.preventDefault();

    /* >>> Validation - an admin can only upload if there is at least 1 image */
    if (files.length < 1) {
      return toast.error("Please add an image");
    }

    const formData = {
      name: product.name,
      category: product.category,
      brand: product.brand,
      color: product.color,
      quantity: Number(product.quantity),
      regularPrice: product.regularPrice,
      price: product.price,
      description,
      image: files,
    };
    // console.log(formData);
    await dispatch(updateProduct({ id, formData }));
    navigate("/admin/all-product");
  };

  /* >>> to `fetch and display` the stored product on the `form` */
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  /* >>> To `send the updated information` of the product to the `database` */
  useEffect(() => {
    setProduct(editProduct);
    if (editProduct && editProduct.image) {
      setFiles(editProduct.image);
    }
    setDescription(
      editProduct && editProduct.description ? editProduct.description : ""
    );
  }, [editProduct]);

  return (
    <section>
      <div className="container">
        {isLoading && <Loader />}
        <h3 className="--mb">Edit Product</h3>

        <ProductForm
          saveProduct={saveProduct}
          product={product}
          isEditing={true}
          setProduct={setProduct}
          description={description}
          setDescription={setDescription}
          files={files}
          setFiles={setFiles}
        />
      </div>
    </section>
  );
};

export default EditProduct;
