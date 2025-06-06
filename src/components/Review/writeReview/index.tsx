import React, { useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { MdCancel } from 'react-icons/md';
import axios from 'axios';

// components
import './style.css';
import Modal from '../../common/Modal';
import axiosInstance from '../../../axios/AxiosInstance';
import { IPreviewProduct } from '../../../types/interfaces/product.interface';

interface IWriteReviewProps {
  productId: string;
  writeReviewModal: boolean;
  setWriteReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPreviewProduct: React.Dispatch<React.SetStateAction<IPreviewProduct>>;
}

const WriteReview = ({
  productId,
  writeReviewModal,
  setWriteReviewModal,
  setPreviewProduct,
}: IWriteReviewProps) => {
  // state for write message and rating
  const [star, setStar] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const writeReviewFnc = async () => {
    if (star === 0 || message === '') {
      return toast.error('Please Fill Review Form');
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
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.error === 'Authorization denied') {
          toast.error('Please log in to your account to write a review');
        } else toast.error(error?.response?.data?.error || error?.message);
      } else {
        toast.error('Unexpected error');
      }
    }
  };

  return (
    <Modal open={writeReviewModal}>
      <div className="write-review-container">
        <div className="write-review-header">
          <h2 className="write-review-h2">Write Review</h2>
          <MdCancel
            onClick={() => setWriteReviewModal(false)}
            className="close_modal"
          />
        </div>
        <div className="write-review-rating-star">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {[...Array(5)].map((_, index) => (
              <label
                htmlFor={`fill-star-${index + 1}`}
                key={index + 1}
                style={{ cursor: 'pointer' }}
              >
                <input
                  type="radio"
                  id={`fill-star-${index + 1}`}
                  onClick={() => setStar(index + 1)}
                  hidden
                />
                <BsFillStarFill
                  size="22px"
                  color={index < star ? '#f8a41b' : '#cccccc'}
                />
              </label>
            ))}
          </div>
          <span onClick={() => setStar(0)} className="write-review-clear">
            Clear
          </span>
        </div>
        <textarea
          className="write-review-text-area"
          id=""
          cols={30}
          rows={5}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="write-review-btn" onClick={writeReviewFnc}>
          Submit
        </button>

        <span className="write-review-note">
          Note: If you&apos;ve already added a review, then it will be edited.
        </span>
      </div>
    </Modal>
  );
};

export default WriteReview;
