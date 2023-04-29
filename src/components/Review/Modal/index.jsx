import React, { useEffect } from "react";
import "./style.css";

const Modal = ({ open, onClose, children }) => {
  const closeReviewModal = (e) => {
    if (e.target.id === "review-modal") onClose();
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      if (window.innerWidth > 769) {
        document.body.style.paddingRight = "16px";
      }
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [open]);

  if (!open) return;

  return (
    <div
      id="review-modal"
      className="modal-container"
      onClick={closeReviewModal}
    >
      {children}
    </div>
  );
};

export default Modal;
