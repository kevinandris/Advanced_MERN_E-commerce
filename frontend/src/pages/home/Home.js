import React, { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import "./Home.scss";
import HomeInfoBox from "./HomeInfoBox";
import CarouselItem from "../../components/corousel/CarouselItem";
import ProductCarousel from "../../components/corousel/Carousel";
import ProductCategory from "./ProductCategory";
import FooterLinks from "../../components/footer/FooterLinks";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/product/productSlice";

const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="--btn --btn-red">{btnText}</button>
      </div>
      <div className="--hr"></div>
    </>
  );
};

const Home = () => {
  const dispatch = useDispatch();

  /* >> Get all products from the database */
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  /* >> Fetch the products from redux and store into the variable */
  const { products } = useSelector((state) => state.product);

  /* >> Capture the latest products */
  const latest = products
    ?.filter((product) => {
      return product.quantity > 0;
    })
    ?.filter((product, index) => index < 7);

  /* >> Capture the phone products */
  const phones = products
    ?.filter((product) => {
      return product.quantity > 0;
    })
    ?.filter((product) => {
      return product.category === "Phone";
    })
    ?.filter((product, index) => index < 7);

  /* >> Show "latest" products and passed into CarouselItem */
  const latestProducts = latest.map((item) => (
    <div key={item.id}>
      <CarouselItem
        name={item.name}
        url={item.image[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        product={item}
      />
    </div>
  ));

  /* >> Show "phone" products and passed into CarouselItem */
  const phoneProducts = phones.map((item) => (
    <div key={item.id}>
      <CarouselItem
        name={item.name}
        url={item.image[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        product={item}
      />
    </div>
  ));

  return (
    <>
      {/* >> component */}
      <Slider />

      <section>
        <HomeInfoBox />
        <div className="container">
          <PageHeading heading={"Latest Products"} btnText={"Shop Now>>>"} />
          <ProductCarousel products={latestProducts} />
        </div>
      </section>

      <section className="--bg-grey">
        <div className="container">
          <h3>Categories</h3>
          <ProductCategory />
        </div>
      </section>

      <section>
        <div className="container">
          <PageHeading heading={"Mobile Phones"} btnText={"Shop Now>>>"} />
          <ProductCarousel products={phoneProducts} />
        </div>
      </section>

      <FooterLinks />
    </>
  );
};

export default Home;
