// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import CircularProgress from '@mui/material/CircularProgress';
// // components
// import Review from './Review';
// import '../css/AllReview.css';
// import Navbar from './Navbar';
// import { giveMeImages } from '../../axios/UlrConfig';
// // actions
// import { getSingleProductById } from '../../actions/ProductAction';

// const AllReview = () => {
//     const { productId } = useParams()
//     const dispatch = useDispatch()
//     const { singleProduct, loading } = useSelector((state) => state.product)

//     useEffect(() => {
//         dispatch(getSingleProductById(productId))
//     }, [productId])

//     return (
//         <>
//             {
//                 loading ?
//                     <div className="men-loader">
//                         <CircularProgress />
//                     </div>
//                     :
//                     <>
//                         <Navbar />
//                         <div className="allreview-main-box">
//                             <div className="allreview-image-box">
//                                 <div className="allreview-image-and-content-box">
//                                     <img src={giveMeImages(singleProduct?.productPictures[0].img)} alt="" />
//                                     <div className="allreview-content-box">
//                                         <h3>{singleProduct?.productName}</h3>
//                                         <div className="allreview-price-box">
//                                             <h2>&#8377; {singleProduct?.sellingPrice}</h2>
//                                             {
//                                                 singleProduct?.actualPrice > 0 &&
//                                                 <strike>&#8377; {singleProduct?.actualPrice}</strike>
//                                             }
//                                             <h4>Save &#8377;{singleProduct?.actualPrice - singleProduct?.sellingPrice} ({100 - parseInt((singleProduct?.sellingPrice / singleProduct?.actualPrice) * 100)}%)</h4>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="allreview-review-box">
//                                 <Review reviewWidth={"all_review_box"} reviewShowBox={"allreview-show-box"} />
//                             </div>
//                         </div>
//                     </>
//             }
//         </>
//     );
// };

// export default AllReview;
