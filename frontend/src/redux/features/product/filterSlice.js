// ! `Rxslice` to create the redux slice
// ! `action.payload` is the information that you send from the frontend to execute the reducer function.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    /* >>> Search function */
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const temporaryProducts = products.filter(
        (product) =>
          product.name?.toLowerCase().includes(search.toLowerCase()) ||
          product.category?.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = temporaryProducts;
    },
    /* >>> Sort function */
    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;
      let temporaryProducts = [];

      if (sort === "latest") {
        temporaryProducts = products;
      }

      if (sort === "lowest-price") {
        temporaryProducts = products.slice().sort((low, high) => {
          return low.price - high.price;
        });
      }

      if (sort === "highest-price") {
        temporaryProducts = products.slice().sort((low, high) => {
          return high.price - low.price;
        });
      }

      if (sort === "a-z") {
        temporaryProducts = products.slice().sort((a, z) => {
          return a.name.localeCompare(z.name);
        });
      }

      if (sort === "z-a") {
        temporaryProducts = products.slice().sort((a, z) => {
          return z.name.localeCompare(a.name);
        });
      }

      state.filteredProducts = temporaryProducts;
    },
    /* >>> Filter category function */
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let temporaryProducts = [];

      if (category === "All") {
        temporaryProducts = products;
      } else {
        temporaryProducts = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = temporaryProducts;
    },

    /* >>> Filter brand function */
    FILTER_BY_BRAND(state, action) {
      const { products, brand } = action.payload;
      let temporaryProducts = [];

      if (brand === "All") {
        temporaryProducts = products;
      } else {
        temporaryProducts = products.filter(
          (product) => product.brand === brand
        );
      }

      state.filteredProducts = temporaryProducts;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
