import React, { useEffect, useState } from "react";
import styles from "./CheckoutForm.module.scss";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast, { Toaster } from "react-hot-toast";
import Card from "../../card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import { Spinner } from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../../../redux/features/cart/cartSlice";
import {
  selectPaymentMethod,
  selectShippingAddress,
} from "../../../redux/features/checkout/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../redux/features/order/orderSlice";

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  // const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const { coupon } = useSelector((state) => state.coupon);

  /* >> Shipped to handleSubmit function */
  const saveOrder = () => {
    const today = new Date();
    const formData = {
      orderDate: today.toDateString(),
      orderTime: today.toLocaleTimeString(),
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed... ",
      cartItems: cartItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      coupon: coupon != null ? coupon : { name: "nil" },
    };

    dispatch(createOrder(formData));
    navigate("/checkout-success");
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  /* >>  This function is on the form */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.REACT_APP_FRONTEND_URL}/checkout-success`,
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }

        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment is successful");
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <Toaster />
      <section>
        <div className={`container ${styles.checkout}`}>
          <h2>Checkout</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <Card cardClass={styles.card}>
                <CheckoutSummary />
              </Card>
            </div>

            <div>
              <Card cardClass={`${styles.card} ${styles.pay}`}>
                <h3>Stripe Checkout</h3>
                <PaymentElement
                  id={styles["payment-element"]}
                  options={paymentElementOptions}
                />
                <button
                  disabled={isLoading || !stripe || !elements}
                  id="submit"
                  className={styles.button}
                >
                  <span id="button-text">
                    {isLoading ? <Spinner /> : "Pay now"}
                  </span>
                </button>

                {/* >> Show any error or success messages */}
                {message && (
                  <div id={styles["payment-message}"]}>{message}</div>
                )}
              </Card>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
