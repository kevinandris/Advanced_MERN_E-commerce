// ! CHILD class - exported to ProductItem.js
import React from "react";
import StarRatings from "react-star-ratings";

const ProductRating = ({ averageRating, numberOfRatings }) => {
  return;
  <>
    {/* To check at least 1 user rated the product before displaying the star rating */}
    {averageRating > 0 && (
      <>
        <StarRatings
          starDimension="20px"
          starSpacing="2px"
          starRatedColor="#F6B01E"
          rating={averageRating}
          editing={false}
        />
        ({numberOfRatings})
      </>
    )}
  </>;
};

export default ProductRating;
