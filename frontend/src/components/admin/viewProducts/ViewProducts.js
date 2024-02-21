import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProducts } from "../../../redux/features/product/productSlice";

const ViewProducts = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading } = useSelector((state) => state.product);

  /* >>> Display the items created on the console */
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProducts());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <section>
      <div className="container product-list">
        <div className="table">
          <div className="--flex-between--flex-dir-column">
            <span>
              <h3>All Products</h3>
              <p>
                ~ <b>{products.length}</b> Products found
              </p>
            </span>
            <span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewProducts;
