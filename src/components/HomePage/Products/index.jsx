import React, { useState } from "react";
import MenProduct1 from "../../../asset/MenProduct_1.jpg";
import MenProduct2 from "../../../asset/MenProduct_2.jpg";
import MenProduct3 from "../../../asset/MenProduct_3.jpg";
import MenProduct4 from "../../../asset/MenProduct_4.jpg";
import MenProduct5 from "../../../asset/MenProduct_5.jpg";
import MenProduct6 from "../../../asset/MenProduct_6.jpg";
import WomenProduct1 from "../../../asset/WomenProduct_1.jpg";
import WomenProduct2 from "../../../asset/WomenProduct_2.jpg";
import WomenProduct3 from "../../../asset/WomenProduct_3.png";
import WomenProduct4 from "../../../asset/WomenProduct_4.jpg";
import WomenProduct5 from "../../../asset/WomenProduct_5.jpg";
import WomenProduct6 from "../../../asset/WomenProduct_6.jpg";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// import { useSelector } from 'react-redux';
// import StarIcon from '@mui/icons-material/Star';

// components
// import { giveMeImages } from '../../axios/UlrConfig';

// css file
import "./style.css";
import HeadingAndParagraph from "../HeadingAndParagraph";

const menProducts = [
  MenProduct1,
  MenProduct2,
  MenProduct3,
  MenProduct4,
  MenProduct5,
  MenProduct6,
];
const womenProducts = [
  WomenProduct1,
  WomenProduct2,
  WomenProduct3,
  WomenProduct4,
  WomenProduct5,
  WomenProduct6,
];

const responsive = {
  0: { items: 1 },
  385: { items: 2 },
  770: { items: 3 },
  1040: { items: 4 },
};

const Product = () => {
  // const { featuredProduct } = useSelector((state) => state.product)
  const [toggle, setToggle] = useState("men");
  const [featuredProduct, setFeaturedProduct] = useState([...menProducts]);

  // const totalRating = (reviews) => {
  //     let sumOfRating = reviews ? reviews.reduce((total, value) => value.rating + total, 0) : 0
  //     sumOfRating = (sumOfRating * 5) / (reviews.length * 5)
  //     return sumOfRating > 0 ? sumOfRating.toFixed(1) : 0
  // }

  const onButtonClick = (value) => {
    setToggle(value);
    setFeaturedProduct(
      value === "women" ? [...womenProducts] : [...menProducts]
    );
  };

  const handleDragStart = (e) => e.preventDefault();

  return (
    <div
      style={{ textAlign: "center", marginBottom: "200px", margin: "20px 10px 30px 10px" }}
    >
      <HeadingAndParagraph
        heading={"Our Best Collections"}
        para={"Pick up for outfit inspiration and must have looks"}
      />
      <div className="product-button-container">
        <button
          className="product-button"
          style={{
            backgroundColor: toggle === "men" && "#030342",
            color: toggle === "men" && "white",
          }}
          onClick={() => onButtonClick("men")}
        >
          Men
        </button>
        <button
          className="product-button"
          style={{
            backgroundColor: toggle === "women" && "#030342",
            color: toggle === "women" && "white",
          }}
          onClick={() => onButtonClick("women")}
        >
          Women
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <AliceCarousel
          responsive={responsive}
          autoPlay={true}
          animationDuration={1500}
          infinite={true}
          disableDotsControls={true}
          disableButtonsControls={true}
          mouseTracking
          items={featuredProduct.map((product) => (
            <img
              src={product}
              onDragStart={handleDragStart}
              role="presentation"
              className="product-images"
            />
          ))}
        />
      </div>
    </div>
  );
};

export default Product;
