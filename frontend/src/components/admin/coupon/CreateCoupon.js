import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../card/Card";
/* ====== From react-datepicker ========= */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/* ============================== */

import Loader from "../../loader/Loader";
import { toast } from "react-toastify";
import { createCoupon } from "../../../redux/features/coupon/couponSlice";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [expiresAt, setExpiresAt] = useState(new Date());
  const { isLoading } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  /* >>> This function is attached on the FORM */
  const saveCoupon = async (e) => {
    e.preventDefault();

    if (name.length < 5) {
      return toast.error("Coupon must be up to 5 characters");
    }

    if (discount < 1) {
      return toast.error("Discount must be greater than one");
    }

    const formData = {
      name,
      discount,
      expiresAt,
    };

    await dispatch(createCoupon(formData));
    setName("");
    setDiscount(0);
  };

  return (
    <>
      {/*  >>> If the screen is loading, displays the spinner */}
      {isLoading && <Loader />}

      <div className="--mb2">
        <h3>Create Coupon</h3>
        <p>
          User the form to <b>Create a Coupon.</b>
        </p>
        <Card cardClass={"card"}>
          <br />
          <form onSubmit={saveCoupon}>
            <label>Coupon Name:</label>
            <input
              type="text"
              placeholder="Enter a coupon"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Coupon Discount:</label>
            <input
              type="number"
              placeholder="Type the coupon discount"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
            />

            <label>Expiry Date:</label>
            <DatePicker
              selected={expiresAt}
              value={expiresAt}
              onChange={(date) => setExpiresAt(date)}
              required
            />

            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save Coupon
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateCoupon;
