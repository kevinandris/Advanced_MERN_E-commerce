// ! Exported to Product.js inside shop folder
import React, { useEffect, useState } from "react";
import styles from "./ProductFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
} from "../../../redux/features/product/filterSlice";

const ProductFilter = () => {
  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const dispatch = useDispatch();

  const allCategories = [
    "All",
    /* >>> To avoid duplicate product using ...new Set()*/
    ...new Set(products?.map((product) => product.category)),
  ];

  const allBrands = [
    "All",
    /* >>> To avoid duplicate product using ...new Set()*/
    ...new Set(products?.map((product) => product.brand)),
  ];

  const filterProductCategory = (eachCategory) => {
    setCategory(eachCategory);
    dispatch(
      FILTER_BY_CATEGORY({ products: products, category: eachCategory })
    );
  };

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  return (
    <div className={styles.filter}>
      {/* >>> CATEGORIES */}
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((eachCategory, index) => {
          return (
            <button
              key={index}
              type="button"
              className={
                `${category}` === eachCategory ? `${styles.active}` : null
              }
              onClick={() => filterProductCategory(eachCategory)}
            >
              &#8250; {eachCategory}
            </button>
          );
        })}
      </div>

      {/* >>> BRANDS */}
      <h4>Brands</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
