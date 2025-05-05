import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

// components
import "./style.css";
import Stepper from "../../PlaceOrderProcess/Stepper";
import {
  IOpenTrackModal,
  TOrderStatus,
} from "../../../types/interfaces/placeOrder.interface";

const stepValue: Record<TOrderStatus, number> = {
  "order confirmed": 2,
  processing: 3,
  shipped: 4,
  delivered: 212,
  failed: 232,
  pending: 1212,
};

interface ITrackOrderProps {
  value: IOpenTrackModal["data"];
  onClose: () => void;
}

const TrackOrder = ({ value, onClose }: ITrackOrderProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const status = value?.status;

    if (status) {
      setCurrentStep(stepValue[status]);
    }
  }, [value?.status]);

  return (
    <div className="trackOrder_modal">
      <MdCancel onClick={onClose} className="close_modal" />

      <h1 className="trackOrder_h1">Track Order</h1>

      <div style={{ margin: "10px 0px" }}>
        <span className="trackOrder_Id">Order ID: {value?.orderId}</span>
      </div>

      <div className="trackOrder_stepper">
        <Stepper
          data={[
            { id: 1, title: "Order Confirmed" },
            { id: 2, title: "Processing" },
            { id: 3, title: "Shipped" },
            { id: 4, title: "Delivered" },
          ]}
          currentStep={currentStep}
        />
      </div>
    </div>
  );
};

export default TrackOrder;
