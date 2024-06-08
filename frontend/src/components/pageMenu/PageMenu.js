// ! CHILD class - imported to profile.js
import React from "react";
import "./PageMenu.scss";
import { NavLink } from "react-router-dom";

const PageMenu = () => {
  return (
    <nav className="--bg-primary --p">
      <ul className="home-links">
        <div>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </div>
        <div>
          <li>
            <NavLink to="/wallet">My Wallet</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default PageMenu;
