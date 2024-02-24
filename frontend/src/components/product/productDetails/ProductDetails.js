import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../redux/features/product/productSlice";
import { Spinner } from "../../loader/Loader";
import ProductRating from "../productRating/ProductRating";
import { calculateAverageRating } from "../../../utils";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import Card from "../../card/Card";
import {
  ADD_TO_CART,
  DECREASE_CART,
  saveCartDB,
  selectCartItems,
} from "../../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const { product, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = useState(0);
  const averageRating = calculateAverageRating(product?.ratings);
  const cartItems = useSelector(selectCartItems);
  /*  give access about the cart information in the cart items*/
  const cart = cartItems.find((cart) => cart._id === id);
  /* to check the cart has been added to the cart items */
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart._id === id;
  });

  /* >>> To fetch a single product */
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch]);

  /* >>> function to return to the first image after showing the last image */
  const slideLength = product?.image?.length;
  const nextSlide = () => {
    setImageIndex(imageIndex === slideLength - 1 ? 0 : imageIndex + 1);
  };

  /* >>> To move to the next image by using useEffect*/
  let slideInterval;
  useEffect(() => {
    if (product?.image.length > 1) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, 3000);
      };
      auto();
    }
    /* useEffect clean up for the interval */
    return () => clearInterval(slideInterval);
  }, [imageIndex, slideInterval, product]);

  /* >> This function located at ADD TO CART and PLUS BUTTON */
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  /* >> This function located at MINUS button */
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) });
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/shop">&larr; Back To Product</Link>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img
                  src={product?.image[imageIndex]}
                  alt={product?.name}
                  className={styles.pImg}
                />

                <div className={styles.smallImg}>
                  {product?.image.map((img, index) => {
                    return (
                      <img
                        key={index}
                        src={img}
                        alt="product"
                        onClick={() => setImageIndex(index)}
                        className={imageIndex === index ? "activeImg" : ""}
                      />
                    );
                  })}
                </div>
              </div>

              <div className={styles.content}>
                <h3>{product?.name}</h3>
                {/* >>> Product's rating based on users */}
                <ProductRating
                  averageRating={averageRating}
                  numberOfRatings={product?.ratings.length}
                />
                <div className="--underline"></div>
                <div className={styles.property}>
                  <p>
                    <b>Price:</b>
                  </p>
                  <p className={styles.price}>{`$${product?.price}`}</p>
                </div>

                <div className={styles.property}>
                  <p>
                    <b>SKU:</b>
                  </p>
                  <p>{product?.sku}</p>
                </div>

                <div className={styles.property}>
                  <p>
                    <b>Category:</b>
                  </p>
                  <p>{product?.category}</p>
                </div>

                <div className={styles.property}>
                  <p>
                    <b>Brand:</b>
                  </p>
                  <p>{product?.brand}</p>
                </div>

                <div className={styles.property}>
                  <p>
                    <b>Color:</b>
                  </p>
                  <p>{product?.color}</p>
                </div>

                <div className={styles.property}>
                  <p>
                    <b>Quantity in Stock:</b>
                  </p>
                  <p>{product?.quantity}</p>
                </div>

                <div className={styles.property}>
                  <p>
                    <b>Sold:</b>
                  </p>
                  <p>{product?.sold}</p>
                </div>

                {/* >> - and + button */}
                <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>

                <div className="--flex-start">
                  {product?.quantity > 0 ? (
                    <button
                      className="--btn --btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      ADD TO CART
                    </button>
                  ) : (
                    <button
                      className="--btn --btn-red"
                      onClick={() =>
                        toast.error("Sorry, Product is out of stock")
                      }
                    >
                      Out of Stock
                    </button>
                  )}

                  <button
                    className="--btn --btn-danger"
                    onClick={() => addToCart(product)}
                  >
                    ADD TO WISHLIST
                  </button>
                </div>

                <div className="--underline"></div>
                <p>
                  <b>Product description:</b>
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product?.description),
                  }}
                ></div>
              </div>
            </div>
          </>
        )}

        {/* >>> Review section */}
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
