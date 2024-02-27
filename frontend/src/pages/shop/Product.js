import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/product/productSlice";
import ProductFilter from "../../components/product/productFilter/ProductFilter";
import ProductList from "../../components/product/productList/ProductList";
import { Spinner } from "../../components/loader/Loader";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { isLoading, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  /* >>> Display the items created on the console */
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  /* >>> TOGGLING function to `open and close the side menu` */
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section style={{ height: "87.8vh" }}>
      {/* // ! 1 */}
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : <ProductFilter />}
        </aside>

        {/* // ! 2 */}
        <div className={styles.content}>
          {isLoading ? <Spinner /> : <ProductList products={products} />}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color="red" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
