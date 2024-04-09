import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCategory.scss";

const categories = [
  {
    id: 1,
    title: "Fantasy",
    image: "https://i.ibb.co/g9kQMg9/fantasyC.jpg",
  },
  {
    id: 2,
    title: "Science Fiction",
    image: "https://i.ibb.co/h9z2gZ8/fictionC.jpg",
  },
  {
    id: 3,
    title: "Romance",
    image: "https://i.ibb.co/D8vyM9z/romanceC.jpg",
  },
];

const Category = ({ title, image }) => {
  const navigate = useNavigate();

  return (
    <div className="category">
      <h3>{title}</h3>
      <img src={image} alt="cat" />
      <button
        className="--btn --btn-primary --btn-block"
        onClick={() => navigate("/shop")}
      >
        {"Shop Now"}
      </button>
    </div>
  );
};

const ProductCategory = () => {
  return (
    <div className="categories">
      {categories.map((cat) => {
        return (
          <div className="--flex-center" key={cat.id}>
            <Category title={cat.title} image={cat.image} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductCategory;
