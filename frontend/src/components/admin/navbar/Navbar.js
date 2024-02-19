import React from "react";
import styles from "./Navbar.module.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/auth/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

// ! to display the color if the link is active or not.
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");
const Navbar = () => {
  const user = useSelector(selectUser);
  const userName = user?.name;

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to={"/admin/home"} className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/category"} className={activeLink}>
              Category
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/brand"} className={activeLink}>
              Brand
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
