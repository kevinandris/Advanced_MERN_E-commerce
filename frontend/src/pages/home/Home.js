import "./Home.scss";
import CarouselItem from "../../components/corousel/CarouselItem";
import Footer from "../../components/footer/Footer";
import FooterLinks from "../../components/footer/FooterLinks";
import HomeInfoBox from "./HomeInfoBox";
import ProductCarousel from "../../components/corousel/Carousel";
import ProductCategory from "./ProductCategory";
import React, { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import { getProducts } from "../../redux/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import FooterMap from "../../components/footer/FooterMap";

const PageHeading = ({ heading }) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin pageHeading">{heading}</h2>
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
      return product.quantity > 10;
    })
    ?.filter((product, index) => index < 10);

  /* >> Capture the discounted books */
  const books = products
    ?.filter((product) => {
      return product.quantity > 0;
    })
    ?.filter((product) => {
      return product.category === "Old";
    })
    ?.filter((product, index) => index < 7);

  /* >> Show "latest" products and passed into CarouselItem */
  const popularBooks = latest.map((item) => (
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

  /* >> Show "discounted books" products and passed into CarouselItem */
  const discountedBooks = books.map((item) => (
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
          <PageHeading heading={"Popular Books"} />
          <ProductCarousel products={popularBooks} />
        </div>
      </section>

      <section className="--bg-white">
        <div className="container">
          <PageHeading heading={"Popular Categories"} />
          <ProductCategory />
        </div>
      </section>

      <section>
        <div className="container">
          <PageHeading heading={"Discounted books"} />
          <ProductCarousel products={discountedBooks} />
        </div>
      </section>

      <FooterMap />
      <FooterLinks />
      <Footer />
    </>
  );
};

export default Home;
