import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import { selectUser } from "../../redux/features/auth/authSlice";
import masterCardImg from "../../assets/mc_symbol.png";
import { Spinner } from "../../components/loader/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { extractIdAndCartQuantity } from "../../utils";
import { selectShippingAddress } from "../../redux/features/checkout/checkoutSlice";

const CheckoutWallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const user = useSelector(selectUser);
  const { isLoading } = useSelector((state) => state.order);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const { coupon } = useSelector((state) => state.coupon);
  const productIDs = extractIdAndCartQuantity(cartItems);

  const makePayment = async () => {
    /* Check the total amount  */
    if (cartTotalAmount < 1) {
      return toast.error("Cart amount is zero");
    } else {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/order/payWithWallet`,
        {
          items: productIDs,
          cartItems,
          shippingAddress,
          coupon: coupon !== null ? coupon : { name: "nil" },
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
      window.location.href = response.data.url;
    }
  };

  const goToWallet = () => {
    /* >> redirect user to wallet page */
    navigate("/wallet");
  };

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
                <h3>Keipy Wallet Checkout</h3>
                <div className="wallet-info --card --mr">
                  <span className="--flex-between">
                    <p>Account balance</p>
                    <img src={masterCardImg} alt="card" width={50} />
                  </span>

                  <h4>${user?.balance?.toFixed(2)}</h4>
                </div>
                <br />
                {cartTotalAmount < user?.balance?.toFixed(2) ? (
                  <>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <button
                        type="button"
                        className={styles.button}
                        onClick={makePayment}
                      >
                        Pay now
                      </button>
                    )}
                  </>
                ) : (
                  <div className="--center-all">
                    <h4>You do not have enough money on your account.</h4>
                    <button
                      type="button"
                      className="--btn --btn-red --btn-block"
                      onClick={goToWallet}
                    >
                      Top Up Wallet
                    </button>
                  </div>
                )}
              </Card>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CheckoutWallet;
