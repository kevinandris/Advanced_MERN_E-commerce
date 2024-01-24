import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  // ! To get the current year
  const date = new Date();
  const year = date.getFullYear();

  return <div className={styles.footer}>&copy; {year} All Rights Reserved</div>;
};

export default Footer;
