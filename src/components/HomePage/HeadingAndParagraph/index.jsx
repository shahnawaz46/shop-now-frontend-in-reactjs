import React from "react";
import "./style.css";

const HeadingAndParagraph = ({ heading, para }) => {
  return (
    <div style={{marginBottom:'20px'}}>
      <div className="product-heading-container">
        <div className="product-heading-border" />
        <h2 className="product-heading">{heading}</h2>
        <div className="product-heading-border" />
      </div>
      <p className="product-para">{para}</p>
    </div>
  );
};

export default HeadingAndParagraph;
