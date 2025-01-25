import React, { useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

// components
import './style.css';
import Modal from '../../common/Modal';
import axiosInstance from '../../../axios/AxiosInstance';

const WriteReview = ({
  productId,
  writeReviewModal,
  setWriteReviewModal,
  setPreviewProduct,
}) => {
  // state for write message and rating
  const [star, setStar] = useState(0);
  const [message, setMessage] = useState('');

  const writeReviewFnc = async () => {
    if (star == 0 || message == '') {
      return alert('Please Fill Review Form');
    }

    try {
      const user = {
        product_id: productId,
        message,
        rating: star,
        date: new Date(),
      };
      // return console.log(user);
      const res = await axiosInstance.post('/product/write_review', user);
      setPreviewProduct((prev) => ({ ...prev, reviews: res.data.allReviews }));

      setStar(0);
      setMessage('');
      setWriteReviewModal(false);

      toast.success(res.data.message);
    } catch (error) {
      error.response && console.log(error.response.data.error);
    }
  };

  return (
    <Modal open={writeReviewModal} onClose={() => setWriteReviewModal(false)}>
      <div className="write_review_container">
        <h2>Write Review</h2>
        <div className="write_review_rating_star">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {[...Array(5)].map((_, index) => (
              <label
                htmlFor={`fill-star-${index + 1}`}
                key={index + 1}
                style={{ cursor: 'pointer' }}
              >
                <input
                  type="radio"
                  value={index + 1}
                  id={`fill-star-${index + 1}`}
                  onClick={(e) => setStar(e.target.value)}
                  hidden
                />
                <BsFillStarFill
                  size="22px"
                  color={index < star ? '#f8a41b' : '#cccccc'}
                />
              </label>
            ))}
          </div>
          <span onClick={() => setStar(0)} style={{ cursor: 'pointer' }}>
            Clear
          </span>
        </div>
        <textarea
          className="write_review_text_area"
          id=""
          cols="30"
          rows="5"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="write_review_btn" onClick={writeReviewFnc}>
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default WriteReview;
