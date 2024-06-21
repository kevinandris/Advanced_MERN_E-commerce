// ! CHILD class -- exported to ProductList.js
import React from "react";
import styles from "./ProductItem.module.scss";
import Card from "../../card/Card";
import { Link } from "react-router-dom";
import { calculateAverageRating, shortenText } from "../../../utils/index";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import ProductRating from "../productRating/ProductRating";
import {
  ADD_TO_CART,
  saveCartDB,
} from "../../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductItem = ({
  product,
  grid,
  _id,
  name,
  price,
  image,
  regularPrice,
}) => {
  const dispatch = useDispatch();
  const averageRating = calculateAverageRating(product.ratings);

  /* >> This function located at ADD TO CART */
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${_id}`}>
        <div className={styles.img}>
          <img src={image[0]} alt={name} />
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.details}>
          <p>
            <span>{regularPrice > 0 && <del>${regularPrice}</del>}</span>
            {` $${price}`}
          </p>

          {/* >>> Product's rating based on users */}
          <ProductRating
            averageRating={averageRating}
            numberOfRatings={product.ratings.length}
          />

          <h4>{shortenText(name, 18)}</h4>

          {/* >>> If we are not in GRID display*/}
          {/* >>> Avoid raw HTML from the database & preventing from hacks using `dangerouslySetInnerHTML`*/}
          {!grid && (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  shortenText(product?.description, 200)
                ),
              }}
            ></div>
          )}

          {product?.quantity > 0 ? (
            <button
              className="--btn --btn-primary"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          ) : (
            <button
              className="--btn --btn-red"
              onClick={() => toast.error("Sorry, the book is out of stock")}
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
