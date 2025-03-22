import { useEffect, useState } from 'react';

// components
import './style.css';
import Stepper from '../../PlaceOrderProcess/Stepper';
import { MdCancel } from 'react-icons/md';

const stepValue = {
  'order confirmed': 2,
  processing: 3,
  shipped: 4,
};

const TrackOrder = ({ onClose, value }) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setCurrentStep(stepValue[value?.status]);
  }, [value?.status]);

  return (
    <div className="trackOrder_modal">
      <MdCancel onClick={onClose} className="close_modal" />

      <h1 className="trackOrder_h1">Track Order</h1>
      <div style={{ margin: '10px 0px' }}>
        <span className="trackOrder_Id">Order ID: {value.orderId}</span>
      </div>

      <div className="trackOrder_stepper">
        <Stepper
          data={[
            { title: 'Order Confirmed' },
            { title: 'Processing' },
            { title: 'Shipped' },
            { title: 'Delivered' },
          ]}
          currentStep={currentStep}
        />
      </div>
    </div>
  );
};

export default TrackOrder;
