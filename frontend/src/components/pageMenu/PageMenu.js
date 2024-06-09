// ! CHILD class - imported to profile.js
import React from "react";
import "./PageMenu.scss";
import { NavLink, Link } from "react-router-dom";

const PageMenu = () => {
  return (
    <nav className="--bg-primary --p">
      <ul className="home-links">
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/wallet">My Wallet</NavLink>
        </li>
        <li>
          <Link to="/wishlist">
            Wishlist
            {/* create a blank space */}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PageMenu;
