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
    <div className="review-container">
      <div className="review-sub-container">
        {/*-- modal for write review start */}
        <WriteReview
          productId={productId}
          writeReviewModal={writeReviewModal}
          setWriteReviewModal={setWriteReviewModal}
          setPreviewProduct={setPreviewProduct}
        />
        {/* modal for write review end -- */}

        <div className="review-header">
          <h2 className="review-heading">Total Reviews {allReviews?.length}</h2>
          <button
            className="review-btn"
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
                <div className="review-detail-container" key={index}>
                  <div className="review-user-container">
                    <img
                      src={value?.userId?.profilePicture || AvatarImage}
                      alt={value.userId.firstName || 'review user'}
                      loading="lazy"
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                    <span className="review-text">Reviewed by</span>
                    <h3 className="review-user-name">
                      {value.userId.firstName} {value.userId.lastName}
                    </h3>
                  </div>

                  <div className="review-message-container">
                    <div className="review-star">
                      <div>
                        {[...Array(5)].map((val, ind) => (
                          <BsFillStarFill
                            key={ind}
                            size="18px"
                            color={
                              ind + 1 <= value.rating ? '#f8a41b' : '#cccccc'
                            }
                          />
                        ))}
                      </div>
                      <span className="review-date">
                        {printReviewDate(value.update_date)}
                      </span>
                    </div>
                    <p className="review-msg">{value.message}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
