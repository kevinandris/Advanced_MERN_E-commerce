import React from "react";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartTotalAmount } from "../../redux/features/cart/cartSlice";
import { selectUser } from "../../redux/features/auth/authSlice";

const CheckoutFlutterwave = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const user = useSelector(selectUser);

  function makePayment() {
    // FlutterwaveCheckout({
    //   public_key: process.env.REACT_APP_FLUTTERWAVE_PK,
    //   tx_ref: process.env.REACT_APP_TX_REF,
    //   amount: cartTotalAmount,
    //   currency: "NZD",
    //   payment_options: "card, banktransfer, ussd",
    //   redirect_url: `${process.env.REACT_APP_BACKEND_URL}/api/order/response`,
    //   // meta: {
    //   //   source: "docs-inline-test",
    //   //   consumer_mac: "92a3-912ba-1192a",
    //   // },
    //   customer: {
    //     email: user.email,
    //     phone_number: user.phone,
    //     name: user.name,
    //   },
    //   customizations: {
    //     title: "Keipy Online store",
    //     description: "Payment for products",
    //     logo: "https://checkout.flutterwave.com/assets/img/rave-logo.png",
    //   },
    // });
  }

  return (
    <>
      <section style={{ height: "87.8vh" }}>
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
                <h3>Flutterwave Checkout</h3>
                <button
                  type="button"
                  className={styles.button}
                  onClick={makePayment}
                >
                  Process to flutterwave payment
                </button>
              </Card>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CheckoutFlutterwave;
