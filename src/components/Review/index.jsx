import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
// import { useSelector, useDispatch } from "react-redux";
import AvatarImage from "../../asset/avatar.jpg";

// components
import "./style.css";
import Modal from "../../common/Modal";
import { giveMeProfileImage } from "../../axios/UlrConfig";

// action
// import Axios from "../../axios/Axios";
// import { getSingleProductById } from "../../actions/ProductAction";

const Reviews = ({ productReview, size = null }) => {
  //   const history = useHistory();
  //   const dispatch = useDispatch();
  //   const { authenticate } = useSelector((state) => state.user);
  //   const { singleProduct } = useSelector((state) => state.product);

  // state for write message and rating
  //   const [message, setMessage] = useState("");
  const [star, setStar] = useState(0);
  const [writeReviewModal, setWriteReviewModal] = useState(false);

  //   const writeReviewFnc = async () => {
  //     if (star == 0 || message == "") {
  //       alert("Please Fill Review Form");
  //     } else {
  //       try {
  //         const user = {
  //           product_id: singleProduct._id,
  //           message,
  //           rating: star,
  //           date: new Date(),
  //         };
  //         const res = await Axios.post("product/write_review", user);
  //         dispatch(getSingleProductById(singleProduct?._id));
  //         setStar(0);
  //         setMessage("");
  //         setWriteReviewModal(false);
  //       } catch (error) {
  //         error.response && console.log(error.response.data.error);
  //       }
  //     }
  //   };

  const printReviewDate = (db_date) => {
    const date = new Date(db_date);
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <div className="review-main-box">
      {/*-- modal for write review start */}
      <Modal open={writeReviewModal} onClose={() => setWriteReviewModal(false)}>
        <div className="review-box_1">
          <h2>Write Review</h2>
          <div className="review-rating-star">
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {[...Array(5)].map((_, index) => (
                <label
                  htmlFor={`fill-star-${index+1}`}
                  key={index+1}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    value={index + 1}
                    id={`fill-star-${index+1}`}
                    onClick={(e) => setStar(e.target.value)}
                    style={{ display: "none" }}
                  />
                  <BsFillStarFill
                    size="22px"
                    color={index < star ? "#f8a41b" : "#cccccc"}
                  />
                </label>
              ))}
            </div>
            <span onClick={() => setStar(0)} style={{ cursor: "pointer" }}>Clear</span>
          </div>
          <textarea
            className="review-text-area"
            id=""
            cols="30"
            rows="5"
            // onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="review-rating-submit-button"
            // onClick={writeReviewFnc}
          >
            Submit
          </button>
        </div>
      </Modal>
      {/* modal for write review end -- */}

      <div className="review-box_2">
        <h2>Total Reviews {productReview?.length}</h2>
        <button
          // onClick={() =>
          //   authenticate ? setWriteReviewModal(true) : history.push("/login")
          // }
          onClick={() => setWriteReviewModal(true)}
        >
          Write Review
        </button>
      </div>

      <div>
        {productReview.length > 0 &&
          productReview?.slice(0, size).map((value, index) => {
            return (
              <div className="review-show-box" key={index}>
                <div className="review-user-name">
                  <img
                    src={
                      value.userId.profilePicture
                        ? giveMeProfileImage(value.userId.profilePicture)
                        : AvatarImage
                    }
                    loading="lazy"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <h5>Reviewed by</h5>
                  <h4>
                    {value.userId.firstName} {value.userId.lastName}
                  </h4>
                </div>
                <div className="review-message">
                  <div className="review-star">
                    <h5>
                      {[...Array(5)].map((val, ind) => (
                        <BsFillStarFill
                          key={ind}
                          size="18px"
                          color={
                            ind + 1 <= value.rating ? "#f8a41b" : "#cccccc"
                          }
                        />
                      ))}
                    </h5>
                    <span>{printReviewDate(value.update_date)}</span>
                  </div>
                  <h4>{value.message}</h4>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Reviews;
