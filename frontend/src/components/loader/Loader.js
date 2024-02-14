import React from "react";
import styles from "./Loader.module.scss";
import ReactDOM from "react-dom";
import loaderImg from "../../assets/loader.gif";
import spinnerImg from "../../assets/spinner.jpg";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="loading" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const Spinner = () => {
  return (
    <div className="--center-all">
      <img src={spinnerImg} alt="loading" width={50} />
    </div>
  );
};

export default Loader;
