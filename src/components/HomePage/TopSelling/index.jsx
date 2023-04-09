import React from "react";
import "./style.css";
import MenProduct1 from "../../../asset/MenProduct_1.jpg";
import MenProduct2 from "../../../asset/MenProduct_2.jpg";
import MenProduct3 from "../../../asset/MenProduct_3.jpg";
import MenProduct4 from "../../../asset/MenProduct_4.jpg";
import MenProduct5 from "../../../asset/MenProduct_5.jpg";
import WomenProduct1 from "../../../asset/WomenProduct_1.jpg";
import WomenProduct2 from "../../../asset/WomenProduct_2.jpg";
import WomenProduct3 from "../../../asset/WomenProduct_3.png";
import WomenProduct4 from "../../../asset/WomenProduct_4.jpg";
import WomenProduct5 from "../../../asset/WomenProduct_5.jpg";
import { motion } from "framer-motion";
import HeadingAndParagraph from "../HeadingAndParagraph";

const topSellingProducts = [
  MenProduct1,
  MenProduct2,
  MenProduct3,
  MenProduct4,
  MenProduct5,
  WomenProduct1,
  WomenProduct2,
  WomenProduct3,
  WomenProduct4,
  WomenProduct5,
];

const TopSelling = () => {
  return (
    <div className="top-selling-container">
      <HeadingAndParagraph
        heading={"Top Selling Products"}
        para={"Pick up for outfit inspiration and must have looks"}
      />
      <div className="top-selling-image-container">
        {topSellingProducts.map((product,index) => (
          <motion.img
            whileHover={{ scale: 1.03, transition: { duration: 0.2 }, }}
            whileTap={{ scale: 1.03 }}
            key={index}
            src={product}
            alt="not-found"
            className="top-selling-images"
          />
        ))}
      </div>
    </div>
  );
};

export default TopSelling;
