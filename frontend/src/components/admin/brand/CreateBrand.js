import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import Card from "../../card/Card";
import {
  createBrand,
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { toast } from "react-toastify";

const CreateBrand = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // ! To keep/display the categories on the screen without being refreshed
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const saveBrand = async (e) => {
    // console.log(name, category);
    e.preventDefault();

    if (name.length < 3) {
      return toast.error("Brand name must be more than 3 characters");
    }

    if (!category) {
      return toast.error("Please add a parent category");
    }

    const formData = {
      name,
      category,
    };

    await dispatch(createBrand(formData));
    await dispatch(getBrands());
    setName("");
  };
  return (
    <>
      {/* // * If the screen is loading, displays the spinner */}
      {isLoading && <Loader />}

      <div className="--mb2">
        <h3>Create Brand</h3>
        <p>
          User the form to <b>create a brand.</b>
        </p>
        <Card cardClass={"card"}>
          <br />
          <form onSubmit={saveBrand}>
            <label>Brand Name:</label>
            <input
              type="text"
              placeholder="Brand name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Parent Category:</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category:</option>
              {/* // ! Fetch the categories stored from the Database using map function */}
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>

            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save Brand
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateBrand;
