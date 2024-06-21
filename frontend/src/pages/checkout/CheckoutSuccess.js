import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import { CLEAR_CART } from "../../redux/features/cart/cartSlice";
import "./Checkout.scss";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CLEAR_CART());
  }, [dispatch]);

  return (
    <>
      <Confetti />
      <section style={{ height: "88.82vh" }}>
        <div className="container">
          <h2>Checkout Successful</h2>
          <p>Thank you for your purchase</p>
          <br />

          <button className="--btn --btn-secondary">
            <Link to="/order-history">View Order Status</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default CheckoutSuccess;
