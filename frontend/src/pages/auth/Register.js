import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cPassword } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = () => {};

  return (
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
              name={email}
              value={email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name={password}
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
  );
};

export default Register;
