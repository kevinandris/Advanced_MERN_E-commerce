import React, { useState } from "react";
import styles from "./Slider.module.scss";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./Slider-data";
import { Navigate } from "react-router-dom";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {};
  const nextSlide = () => {};

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

      {/* // ! Map through Slider Data */}
      {sliderData.map((slide, index) => {
        const { image, heading, description } = slide;

        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <span className="span1"></span>
                  <span className="span2"></span>
                  <span className="span3"></span>
                  <span className="span4"></span>
                  <h2>{heading}</h2>
                  <p>{description}</p>
                  <hr />
                  <button
                    className="--btn --btn-primary"
                    onClick={() => Navigate("/shop")}
                  >
                    Shop Now
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
