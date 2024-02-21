// ! Exported to ViewProduct.js
import React from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <BiSearch size={20} className={styles.icon} color="#000000" />
      <input
        type="text"
        placeholder="Search product"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
