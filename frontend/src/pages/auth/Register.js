import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, register } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cPassword } = formData;
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault(); /* preventing a reload every-time a user submits the their details */
    // console.log(name, email, password, cPassword);
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (password != cPassword) {
      return toast.error("Your passwords are not match");
    }

    // * Send the name, email and passwords in an object to the "BACKEND" to register the user using dispatch (redux-toolkit)
    const userData = {
      name,
      email,
      password,
    };

    await dispatch(register(userData));
  };

  // ! Monitoring whether the registration is successful or a user is logged in and direct them to the homepage.
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }

    // * In case there is another redux function that fires from the homepage, it will have a fresh state.
    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate]);

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="cPassword"
                value={cPassword}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Already have an account? </p> &nbsp;
              <Link to="/register">Login</Link>
            </span>
          </div>
        </Card>

        <div className={styles.img}>
          <img src={loginImg} alt="Login" width={400} />
        </div>
      </section>
    </>
  );
};

export default Register;
