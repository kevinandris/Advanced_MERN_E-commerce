import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkout/checkoutForm/CheckoutForm";
import { useSelector } from "react-redux";
import { extractIdAndCartQuantity } from "../../utils";
import { selectShippingAddress } from "../../redux/features/checkout/checkoutSlice";
import { selectUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const CheckoutStripe = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");
  const user = useSelector(selectUser);
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const productIDs = extractIdAndCartQuantity(cartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const { coupon } = useSelector((state) => state.coupon);
  const description = `Keipy Payment by email: ${user.email}, Amount: ${cartTotalAmount}`;

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/order/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: productIDs,
          shipping: shippingAddress,
          description,
          coupon,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        /* >> If something goes wrong during the payment*/
        return res.json().then((json) => Promise.reject(json));
      })

      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage("Failed to initialize checkout.");
        toast.error("Something went wrong!!!");
        console.log(error);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section style={{ height: "88.82vh" }}>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </section>
    </>
  );
};

export default CheckoutStripe;
