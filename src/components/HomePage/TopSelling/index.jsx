import React from "react";
import "./style.css";
import { motion } from "framer-motion";
import HeadingAndParagraph from "../HeadingAndParagraph";
import { useSelector } from "react-redux";
import { giveMeImages } from "../../../axios/UlrConfig";
import { Link } from "react-router-dom";
import ShowError from "../../ShowError";

const TopSelling = () => {
  const { topSellingProducts:{products, error} } = useSelector((state) => state.allProducts);
  // console.log(topSellingProducts);
  
  if(error){
    console.log(error)
    return <ShowError message={error} />
  }

  return (
    <div className="top-selling-container">
      <HeadingAndParagraph
        heading={"Top Selling Products"}
        para={"Pick up for outfit inspiration and must have looks"}
      />
      <div className="top-selling-image-container">
        {products.map((product, index) => (
          <Link to={`/preview/${product?._id}`} key={product?._id}>
            <motion.img
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 1.03 }}
              key={index}
              src={giveMeImages(product?.productPictures[0]?.img)}
              // src={product?.productPictures[0]?.img}
              alt="not-found"
              className="top-selling-images"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopSelling;
