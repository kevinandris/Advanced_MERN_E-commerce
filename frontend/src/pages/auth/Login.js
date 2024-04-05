import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, login } from "../../redux/features/auth/authSlice";
import { getCartDB, saveCartDB } from "../../redux/features/cart/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const redirect = urlParams.get("redirect");

  const loginUser = async (e) => {
    e.preventDefault(); /* preventing a reload every-time a user submits the their details */

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    /* >> Send the name, email and passwords in an object to the "BACKEND" to register the user using dispatch (redux-toolkit) */
    const userData = {
      email,
      password,
    };
    await dispatch(login(userData));
  };

  /*  >> Monitoring whether the registration is successful or a user is logged in and direct them to the homepage.
      AND redirect a user to the cart page
  */
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      if (redirect === "cart") {
        dispatch(
          saveCartDB({
            cartItems: JSON.parse(localStorage.getItem("cartItems")),
          })
        );
        return navigate("/cart");
      }
      dispatch(getCartDB());
    }

    /*  >> In case there is another redux function that fires from the homepage, it will have a fresh state. */
    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate, redirect]);

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width={400} />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
            </form>

            <span className={styles.register}>
              <p>Don't have an account? </p> &nbsp;
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
