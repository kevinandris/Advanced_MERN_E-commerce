import { useEffect, useState } from "react";
import PageMenu from "../../components/pageMenu/PageMenu";
import styles from "../../components/product/productList/ProductList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/product/productItem/ProductItem";
import {
  getWishlist,
  removeFromWishlist,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import "./Wishlist.scss";

const Wishlist = () => {
  const dispatch = useDispatch();
  const [grid, setGrid] = useState(true);
  const { wishlist, isLoading } = useSelector((state) => state.auth);

  const removeWishlist = async (product) => {
    const productId = product._id;
    await dispatch(removeFromWishlist(productId));
    await dispatch(getWishlist());
  };

  /* >> Fetch the wishlist */
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  return (
    <>
      <section style={{ height: "87.8vh" }}>
        {isLoading && <Loader />}
        <div className="container">
          {/* Component file here*/}
          <PageMenu />
          <h2>My Wishlist</h2>
          <div className="--underline"></div>

          <div className={grid ? `${styles.grid}` : `${styles.list}`}>
            {wishlist.length === 0 ? (
              <h4>No product found in your wishlist</h4>
            ) : (
              <>
                {wishlist.map((product) => {
                  return (
                    <div key={product._id}>
                      <ProductItem {...product} grid={grid} product={product} />
                      <button
                        className="wishlistButton --btn-red --btn-block"
                        onClick={() => removeWishlist(product)}
                      >
                        Remove from wishlist
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
