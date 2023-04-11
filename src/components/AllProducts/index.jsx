import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import "./style.css";
import { giveMeImages } from "../../axios/UlrConfig";
import SideBar from "../Sidebar";

const AllProducts = ({ urlSlug, products, subCategory }) => {
  // console.log(products);
  // const totalRating = (reviews) => {
  //     let sumOfRating = reviews ? reviews.reduce((total, value) => value.rating + total, 0) : 0
  //     sumOfRating = (sumOfRating * 5) / (reviews.length * 5)
  //     return sumOfRating > 0 ? sumOfRating.toFixed(1) : 0
  // }

  return (
    <>
      <div className="all-product-container">
        <SideBar subCategory={subCategory} urlSlug={urlSlug} />

        {/* products */}
        <div className="men-product-box">
          {products.length === 0 ? (
            <div
              style={{
                position: "absolute",
                top: "40%",
                left: "55%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <h2 >
              Currently No Products Available
              </h2>
            </div>
          ) : (
            products?.map((value, index) => {
              return (
                <div className="men-product-image-box" key={index}>
                  <img
                    src={giveMeImages(value.productPictures[0].img)}
                    loading="lazy"
                    alt="not found"
                    className="men-product-image"
                  />
                  <div className="product-info-box">
                    <div className="product-name-box">
                      <h4>{value.productName}</h4>
                    </div>
                    <div className="product-rating-box">
                      <span>&#8377; {value.sellingPrice}</span>
                      <div className="product-rating">
                        <AiFillStar
                          style={{
                            fontSize: "20px",
                            color: "#f8a41b",
                            marginRight: "1px",
                          }}
                        />
                        {/* <span>{totalRating(value.reviews)}</span> */}
                      </div>
                    </div>
                    <Link to={`/preview/${value._id}`}>
                      <button className="product-preview-button">
                        Preview
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(AllProducts);
