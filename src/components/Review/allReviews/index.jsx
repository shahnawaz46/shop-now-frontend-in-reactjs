import { useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';

// components
import './style.css';
import AvatarImage from '../../../asset/avatar.jpg';
import WriteReview from '../writeReview';

const AllReviews = ({
  allReviews,
  productId,
  size = null,
  setPreviewProduct,
}) => {
  const [writeReviewModal, setWriteReviewModal] = useState(false);

  const printReviewDate = (db_date) => {
    const date = new Date(db_date);
    const months = [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <div className="review-main-box">
      {/*-- modal for write review start */}
      <WriteReview
        productId={productId}
        writeReviewModal={writeReviewModal}
        setWriteReviewModal={setWriteReviewModal}
        setPreviewProduct={setPreviewProduct}
      />
      {/* modal for write review end -- */}

      <div className="review-box_2">
        <h2>Total Reviews {allReviews?.length}</h2>
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
        {allReviews.length > 0 &&
          allReviews?.slice(0, size).map((value, index) => {
            return (
              <div className="review-show-box" key={index}>
                <div className="review-user-name">
                  <img
                    src={value?.userId?.profilePicture || AvatarImage}
                    loading="lazy"
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      borderRadius: '50%',
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
                            ind + 1 <= value.rating ? '#f8a41b' : '#cccccc'
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

export default AllReviews;
