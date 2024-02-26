//  ! Child class - exported to CheckoutDetails.js
import React, { useEffect } from "react";
import styles from "./CheckoutSummary.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_SUB_TOTAL } from "../../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import Card from "../../card/Card";
import { CartDiscount } from "../../verifyCoupon/VerifyCoupon";

const CheckoutSummary = () => {
  const dispatch = useDispatch();
  const { coupon } = useSelector((state) => state.coupon);
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(CALCULATE_SUB_TOTAL({ coupon }));
  }, [dispatch, cartItems, coupon]);

  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in your cart</p>
            <button className="--btn">
              <Link to="/#products">Back To Shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
            </p>

            <div className={styles.text}>
              <h4>SUBTOTAL:</h4>
              <h3>${cartTotalAmount.toFixed(2)}</h3>
            </div>

            <CartDiscount />

            {/* >> Cart Discount */}
            {cartItems.map((item) => {
              const { _id, name, price, cartQuantity } = item;
              return (
                <Card key={_id} cardClass={styles.card}>
                  <h4>Product &rarr; {name}</h4>
                  <p>Quantity &rarr; {cartQuantity}</p>
                  <p>Unit price &rarr; ${price}</p>
                  <p>Total price &rarr; ${price * cartQuantity}</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
