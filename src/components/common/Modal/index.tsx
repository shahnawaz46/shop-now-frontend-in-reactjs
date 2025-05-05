import { useEffect } from 'react';
import './style.css';
import { IChildren } from '../../../types/interfaces';

interface IModalProps extends IChildren {
  open?: boolean;
  onClose?: () => void;
}

const Modal = ({ open, onClose, children }: IModalProps) => {
  const closeReviewModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement;
    if (onClose && target.id === 'review-modal') {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      if (window.innerWidth > 769) {
        document.body.style.paddingRight = '16px';
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [open]);

  if (!open) return;

  return (
    <div
      id="review-modal"
      className="modal-container"
      onClick={(e) => closeReviewModal(e)}
    >
      {children}
    </div>
  );
};

export default Modal;
