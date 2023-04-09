// import React, { useState } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Modal from '@mui/material/Modal';
// import { BsFillStarFill } from 'react-icons/bs';
// import { useHistory, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

// // components
// import { giveMeProfileImage } from '../../axios/UlrConfig';
// import '../css/Review.css';

// // action
// import Axios from '../../axios/Axios';
// import { getSingleProductById } from '../../actions/ProductAction';

// const WriteReview = ({ reviewWidth, reviewShowBox, size = null }) => {
//     const history = useHistory()
//     const dispatch = useDispatch()
//     const { authenticate } = useSelector((state) => state.user)
//     const { singleProduct } = useSelector((state) => state.product)

//     // state for write message and rating
//     const [message, setMessage] = useState('')
//     const [star, setStar] = useState(0)
//     const [writeReviewModal, setWriteReviewModal] = useState(false)

//     const writeReviewFnc = async () => {
//         if (star == 0 || message == '') {
//             alert("Please Fill Review Form")
//         } else {
//             try {
//                 const user = { product_id: singleProduct._id, message, rating: star, date: new Date() }
//                 const res = await Axios.post('product/write_review', user)
//                 dispatch(getSingleProductById(singleProduct?._id))
//                 setStar(0)
//                 setMessage('')
//                 setWriteReviewModal(false)
//             }
//             catch (error) {
//                 error.response &&
//                     console.log(error.response.data.error)
//             }
//         }
//     }

//     const printReviewDate = (db_date) => {
//         const date = new Date(db_date)
//         const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

//         const day = date.getDate()
//         const month = months[date.getMonth()]
//         const year = date.getFullYear()
//         return `${day} ${month}, ${year}`
//     }

//     const gettingReviewList = () => {
//         if (size) {
//             return singleProduct?.reviews.slice(0, size)
//         } else {
//             return singleProduct?.reviews
//         }
//     }

//     return (
//         <div className={reviewWidth}>
//             {/*-- modal for write review start */}
//             <Modal
//                 open={writeReviewModal}
//                 onClose={() => setWriteReviewModal(false)}
//             >
//                 <div className="review-box_1">
//                     <h2>Write Review</h2>
//                     <div className="review-rating-star">
//                         <div>
//                             {
//                                 [...Array(5)].map((val, ind) =>
//                                     <>
//                                         <input key={ind} type="radio" value={ind + 1} onClick={(e) => setStar(e.target.value)} className="review-rating-input" />
//                                         < BsFillStarFill size="18px" color={ind + 1 <= star ? "#f8a41b" : "#cccccc"} />
//                                     </>
//                                 )
//                             }
//                         </div>
//                         <span onClick={() => setStar(0)} style={{ cursor: 'pointer' }}>Clear</span>
//                     </div>
//                     <textarea className="review-text-area" id="" cols="30" rows="5" onChange={(e) => setMessage(e.target.value)} />
//                     <button className="review-rating-submit-button" onClick={writeReviewFnc}>Submit</button>
//                 </div>
//             </Modal>
//             {/* modal for write review end -- */}

//             <div className="review-box_2">
//                 <h2>Total Reviews {singleProduct?.reviews.length}</h2>
//                 <button onClick={() => authenticate ? setWriteReviewModal(true) : history.push("/login")}>Write Review</button>
//             </div>

//             <div>
//                 {
//                     singleProduct?.reviews.length > 0 &&
//                     gettingReviewList().map((value, index) => {
//                         return (
//                             <div className={reviewShowBox} key={index}>
//                                 <div className="review-user-name">
//                                     <Avatar src={value.userId.profilePicture && giveMeProfileImage(value.userId.profilePicture)} />
//                                     <h5>Reviewed by</h5>
//                                     <h4>{value.userId.firstName} {value.userId.lastName}</h4>
//                                 </div>
//                                 <div className="review-message">
//                                     <div className="review-star">
//                                         <h5>
//                                             {
//                                                 [...Array(5)].map((val, ind) =>
//                                                     < BsFillStarFill key={ind} size="18px" color={ind + 1 <= value.rating ? "#f8a41b" : "#cccccc"} />
//                                                 )
//                                             }
//                                         </h5>
//                                         <span>{printReviewDate(value.update_date)}</span>
//                                     </div>
//                                     <h4>{value.message}</h4>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// };

// export default WriteReview;
