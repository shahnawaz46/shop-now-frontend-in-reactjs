import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import './style.css'


const SideBar = ({subCategory, urlSlug}) => {
    const [category, setCategory] = useState(false);
  return (
    <>
      {/* desktop sub-category */}
      <div className="desktop-category-container">
        {subCategory.map((value, index) => (
          <NavLink
            to={`/collections/${urlSlug}/${value.slug}`}
            key={index}
            className="category-options"
            // activeClassName="men-category-activeclass"
            onClick={() => setCategory(false)}
          >
            {value.categoryName}
          </NavLink>
        ))}
      </div>

      {/* mobile sub-category */}
      <div className="mobile-category-container">
        <div className="men-category-button-box">
          {/* <button className="men-category-button">{categorySlug.split("-").join(" ")}</button> */}
          <button className="men-category-button">{urlSlug}</button>
          <div className="men-category-drop-down">
            {/* <AiOutlineArrowRight onClick={() => setCategory(true)} /> */}
            <AiOutlineArrowRight />
          </div>
        </div>

        <div
          className={
            category
              ? "men-category-mobile-option-box category-show"
              : "men-category-mobile-option-box"
          }
        >
          {
            // getSubCategory(categoryState.categories)
          }
          <div className="men-category-drop-up">
            {/* <AiOutlineArrowLeft onClick={() => setCategory(false)} /> */}
            <AiOutlineArrowLeft />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(SideBar);
