import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/features/cart/cartSlice";
import {
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/features/checkout/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/features/order/orderSlice";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import { selectUser } from "../../redux/features/auth/authSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from "react-hot-toast";

const CheckoutPaypal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const { coupon } = useSelector((state) => state.coupon);
  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "NZD",
    intent: "capture",
  };

  /* >> Shipped to handleSubmit function */
  const saveOrder = () => {
    const today = new Date();
    const formData = {
      orderDate: today.toDateString(),
      orderTime: today.toLocaleTimeString(),
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed... ",
      cartItems: cartItems,
      shippingAddress,
      paymentMethod,
      coupon: coupon != null ? coupon : { name: "nil" },
    };

    dispatch(createOrder(formData));
    navigate("/checkout-success");
  };

  return (
    <>
      <Toaster />
      <PayPalScriptProvider options={initialOptions}>
        <section style={{ height: "87.6vh" }}>
          <div className={`container ${styles.checkout}`}>
            <h2>Welcome to checkout page </h2>
            <form>
              <div>
                <Card cardClass={styles.card}>
                  <CheckoutSummary />
                </Card>
              </div>

              <div>
                <Card cardClass={`${styles.card} ${styles.pay}`}>
                  <h3>PayPal Checkout</h3>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: cartTotalAmount,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        const status = details.status;
                        // console.log(details.status);

                        if (status === "COMPLETED") {
                          toast.success("Payment successful.");
                          saveOrder();
                        }
                      });
                    }}
                  />
                </Card>
              </div>
            </form>
          </div>
        </section>
      </PayPalScriptProvider>
    </>
  );
};

export default CheckoutPaypal;
