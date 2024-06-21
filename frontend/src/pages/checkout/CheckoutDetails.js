import React, { useEffect, useState } from "react";
import styles from "./CheckoutDetails.module.scss";
import Card from "../../components/card/Card";
import { CountryDropdown } from "react-country-region-selector";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
  selectBillingAddress,
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/features/checkout/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });

  // const [billingAddress, setBillingAddress] = useState({
  //   ...initialAddressState,
  // });

  const paymentMethod = useSelector(selectPaymentMethod);
  const shipAddressRedux = useSelector(selectShippingAddress);
  const billAddressRedux = useSelector(selectBillingAddress);

  /* >> Monitoring the user's typing for shipping address form*/
  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  /* >> Monitoring the user's typing for billing address form*/
  // const handleBilling = (e) => {
  //   const { name, value } = e.target;
  //   setBillingAddress({
  //     ...billingAddress,
  //     [name]: value,
  //   });
  // };

  /* >> To check inside the redux if there is any object saved that has properties that are greater than 0 */
  useEffect(() => {
    if (Object.keys(shipAddressRedux).length > 0) {
      setShippingAddress({ ...shipAddressRedux });
    }
    // if (Object.keys(billAddressRedux).length > 0) {
    //   setBillingAddress({ ...billAddressRedux });
    // }
  }, [shipAddressRedux]);

  /* >> send and store the user details to redux */
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    // dispatch(SAVE_BILLING_ADDRESS(billingAddress));

    if (paymentMethod === "stripe") {
      navigate("/checkout-stripe");
    } else if (paymentMethod === "flutterwave") {
      navigate("/checkout-flutterwave");
    } else if (paymentMethod === "paypal") {
      navigate("/checkout-paypal");
    } else if (paymentMethod === "wallet") {
      navigate("/checkout-wallet");
    } else {
      toast.info("Please select a payment method!!!");
      navigate("/cart");
    }
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Check out details page</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Shipping Address</h3>
              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Recipient Name"
                required
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />

              <label>Address line 1</label>
              <input
                type="text"
                placeholder="Your main address"
                required
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />

              <label>Address line 2</label>
              <input
                type="text"
                placeholder="Your backup address"
                required
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />

              <label>City</label>
              <input
                type="text"
                placeholder="Your current city"
                required
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />

              <label>State</label>
              <input
                type="text"
                placeholder="Your current state"
                required
                name="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />

              <label>Postal code</label>
              <input
                type="text"
                placeholder="Your postal code"
                required
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />

              {/* >> from a package*/}
              <label>Country</label>
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) => {
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  });
                }}
              />

              <label>Phone</label>
              <input
                type="text"
                placeholder="Your Phone number"
                required
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />

              <button type="submit" className="--btn --btn-primary">
                Proceed to Checkout
              </button>
            </Card>

            {/* >> Billing */}
            {/* <Card cardClass={styles.card}>
              <h3>Billing Address</h3>

              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
              />

              <label>Address line 1</label>
              <input
                type="text"
                placeholder="Your main address"
                required
                name="line1"
                value={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
              />

              <label>Address line 2</label>
              <input
                type="text"
                placeholder="Your backup address"
                required
                name="line2"
                value={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />

              <label>City</label>
              <input
                type="text"
                placeholder="Your current city"
                required
                name="city"
                value={billingAddress.city}
                onChange={(e) => handleBilling(e)}
              />

              <label>State</label>
              <input
                type="text"
                placeholder="Your state"
                required
                name="state"
                value={billingAddress.state}
                onChange={(e) => handleBilling(e)}
              />

              <label>Postal code</label>
              <input
                type="text"
                placeholder="Your Postal code"
                required
                name="postal_code"
                value={billingAddress.postal_code}
                onChange={(e) => handleBilling(e)}
              />

              <label>Country</label>
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={billingAddress.country}
                onChange={(val) => {
                  handleBilling({
                    target: {
                      name: "country",
                      value: val,
                    },
                  });
                }}
              />

              <label>Phone</label>
              <input
                type="text"
                placeholder="Your Phone number"
                required
                name="phone"
                value={billingAddress.phone}
                onChange={(e) => handleBilling(e)}
              />

             
            </Card> */}
          </div>

          <div>
            <Card cardClass={styles.card}>
              {/* >> A component */}
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
