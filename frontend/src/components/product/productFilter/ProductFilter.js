// ! Exported to Product.js inside shop folder
import React, { useEffect, useState } from "react";
import styles from "./ProductFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/features/product/filterSlice";
import { GET_PRICE_RANGE } from "../../../redux/features/product/productSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ProductFilter = () => {
  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState([50, 200]);
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

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  useEffect(() => {
    dispatch(GET_PRICE_RANGE({ products }));
  }, [dispatch, products]);

  /* >>> This function is located at the clear filter button*/
  const clearFilter = () => {
    setCategory("All");
    setBrand("All");
    setPrice([minPrice, maxPrice]);
  };

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
              {eachCategory}
            </button>
          );
        })}
      </div>
      {/* >>> BRANDS */}
      <h4>Books</h4>
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
      {/* >>> PRICE SLIDER */}
      <h4>Price</h4>
      <div className={styles.price}>
        {/* >>> Slider from rs-slider npmjs.com */}
        <Slider
          range
          marks={{
            1: `${price[0]}`,
            60: `${price[1]}`,
          }}
          min={minPrice}
          max={maxPrice}
          defaultValue={[minPrice, maxPrice]}
          tipFormatter={(value) => `$${value}`}
          tipProps={{
            placement: "top",
            visible: true,
          }}
          value={price}
          onChange={(price) => setPrice(price)}
        />
      </div>
      <button className="--btn --btn-primary --btn-block" onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
  );
};

export default ProductFilter;
