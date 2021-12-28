import React from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';

// components
import { giveMeImages } from '../../axios/UlrConfig';

// css file
import '../css/HomePageProducts.css';


const HomePageProduct = () => {
    const { featuredProduct } = useSelector((state) => state.product)

    const totalRating = (reviews) => {
        let sumOfRating = reviews ? reviews.reduce((total, value) => value.rating + total, 0) : 0
        sumOfRating = (sumOfRating * 5) / (reviews.length * 5)
        return sumOfRating > 0 ? sumOfRating.toFixed(1) : 0
    }

    return (
        <>
            {
                ["Men", "Women"].map((item, index) => {
                    return (
                        <div className="homepage-product-box" key={index}>
                            <h3 className="homepage-product-box-heading">{item} Featured Products</h3>
                            <div className="homepage-products">
                                {
                                    featuredProduct?.map((value, ind) => {
                                        return (
                                            value.categoryId.categoryName.split(" ")[0] === item &&
                                            < div className="homepage-product-detail" key={ind} >
                                                <img src={giveMeImages(value.productPictures[0].img)} alt="" className="homepage-product-img" />
                                                <div className="homepage-product-content">
                                                    <span className="homepage-product-name">{value.productName}</span>
                                                    <div className="homepage-product-price-rating">
                                                        <span>Rs. {value.sellingPrice}</span>
                                                        <div className="product-rating">
                                                            <StarIcon style={{ fontSize: '20px', color: '#f8a41b', marginRight: '1px' }} />
                                                            <span>{totalRating(value.reviews)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="homepage-preview-button-box">
                                                        <Link to={`/preview/${value._id}`}><button className="homepage-preview-button">Preview</button></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }
                )
            }
        </>

    );
};

export default HomePageProduct;