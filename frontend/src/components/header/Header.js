import React from "react";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

// ! created this so we can use the LOGO on any page we like.
export const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Keipy<span>Shop</span>
      </h2>
    </Link>
  </div>
);

// ! to display the color if the link is active or not
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const cart = (
    <span className={styles.cart}>
      <Link to={"/cart"}>
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  );
  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav>
          <ul>
            <li>
              <NavLink to="/shop" className={activeLink}>
                Shop
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]}>
            <span className={styles.links}>
              <NavLink to={"login"} className={activeLink}>
                Login
              </NavLink>
              <NavLink to={"register"} className={activeLink}>
                Register
              </NavLink>
              <NavLink to={"order-history"} className={activeLink}>
                My Order
              </NavLink>
            </span>

            {cart}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
