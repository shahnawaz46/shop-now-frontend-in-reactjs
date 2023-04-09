import React, { useState, useEffect } from "react";
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
// import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
// import CircularProgress from '@mui/material/CircularProgress';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { BsRecordCircleFill } from "react-icons/bs";
import axios from "axios";
// components
import "./style.css";
// import Navbar from '../Navbar';
// import Footer from '../Footer';
import { giveMeImages } from "../../axios/UlrConfig";

// action
import { getAllProductBySlug } from "../../actions/ProductAction";

const AllProducts = ({ urlSlug }) => {
    // const 
  // const { categorySlug, subCategorySlug } = useParams()

  const [category, setCategory] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);

  // const dispatch = useDispatch()
  // const categoryState = useSelector((state) => state.category)
  // const productState = useSelector((state) => state.product)

  // const getSubCategory = (categories) => {
  //     if (categories.length > 0) {
  //         let allCategory = categories.filter((data) => data.slug === categorySlug)
  //         if (allCategory.length > 0) {
  //             return allCategory[0].children.map((value, index) => <NavLink to={`/collections/${categorySlug}/${value.slug}`} key={index} className="men-category-options" activeClassName="men-category-activeclass" onClick={() => setCategory(false)}>{value.categoryName.split(" ").slice(1).join(" ")}</NavLink>)
  //         }
  //         else {
  //             return <Redirect to="/*" />
  //         }
  //     }
  // }

  // const totalRating = (reviews) => {
  //     let sumOfRating = reviews ? reviews.reduce((total, value) => value.rating + total, 0) : 0
  //     sumOfRating = (sumOfRating * 5) / (reviews.length * 5)
  //     return sumOfRating > 0 ? sumOfRating.toFixed(1) : 0
  // }

  // useEffect(() => {
  //     subCategorySlug ? dispatch((getAllProductBySlug(subCategorySlug))) : dispatch(getAllProductBySlug(categorySlug))
  // }, [categorySlug, subCategorySlug])

  const fetchProducts = async () => {
    const res = await axios.get(
      `http://localhost:9000/api/product/${urlSlug}`
    );
    console.log(res.data);
    setAllProducts(res.data.products);
    setAllSubCategory(res.data.subCategory);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="all-product-container">
        {/* desktop sub-category */}
        <div className="desktop-category-container">
          {
            // getSubCategory(categoryState.categories)
            allSubCategory.map((value, index) => (
              <NavLink
                to={`/collections/${urlSlug}/${value.slug}`}
                key={index}
                className="category-options"
                // activeClassName="men-category-activeclass"
                onClick={() => setCategory(false)}
              >
                {value.categoryName.split(" ").slice(1).join(" ")}
              </NavLink>
            ))
          }
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

        {/* products */}
        {false ? (
          <div className="men-loader">
            <BsRecordCircleFill />
          </div>
        ) : (
          <div className="men-product-box">
            {allProducts?.map((value, index) => {
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
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
