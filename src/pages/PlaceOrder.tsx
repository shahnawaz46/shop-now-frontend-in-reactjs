import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";

// components
import RootLayout from "../components/Layout/RootLayout";
import Stepper from "../components/PlaceOrderProcess/Stepper";
import ShippingAddress from "../components/PlaceOrderProcess/ShippingAddress";
import OrderSummary from "../components/PlaceOrderProcess/OrderSummary";
import Payment from "../components/PlaceOrderProcess/Payment";
import OrderDone from "../components/PlaceOrderProcess/OrderDone";
import { clearStateAndStorage } from "../utils/ClearStateAndStorage";
import { fetchPersonalDetails } from "../redux/slices/UserSlice";
import { ScreenLoading } from "../components/Loaders";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RequestStatus } from "../types/enums/RequestStatus";
import { ISteeperItem } from "../types/interfaces";

const stepperItem: ISteeperItem[] = [
  { id: 1, title: "Delivery Address" },
  { id: 2, title: "Order Summary" },
  { id: 3, title: "Payment" },
];

const PlaceOrder = () => {
  const { status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [notAuthenticated, setNotAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    console.log("location:", location);
    const query = new URLSearchParams(location.search);
    if (query) {
      if (query.get("step")) setCurrentStep(Number(query.get("step")));
      else if (query.get("status")) setCurrentStep(4);
    }
  }, [location]);

  useEffect(() => {
    if (status === RequestStatus.Idle) dispatch(fetchPersonalDetails());
  }, []);

  useEffect(() => {
    if (status === RequestStatus.Failed) {
      clearStateAndStorage();
      setNotAuthenticated(true);
    }
  }, [status]);

  // location.stata have product data that i am passing from PreviewProduct component for buy product
  // and the reason i am passing location.state to the login page is after the user login i will redirect the user to place order Page
  if (notAuthenticated)
    return (
      <Navigate to={"/account/login"} state={location.state} replace={true} />
    );

  if (status === RequestStatus.Idle || status === RequestStatus.Pending)
    return <ScreenLoading />;

  return (
    <RootLayout footer={false}>
      <div className="placeOrderProcess_container">
        <div className="placeOrderProcess_sub_container">
          <div style={{ padding: "0px 12px" }}>
            <Stepper data={stepperItem} currentStep={currentStep} />
          </div>

          {currentStep === 1 ? (
            <ShippingAddress />
          ) : currentStep === 2 ? (
            <OrderSummary />
          ) : currentStep === 3 ? (
            <Payment />
          ) : currentStep === 4 ? (
            <OrderDone />
          ) : null}
        </div>
      </div>
    </RootLayout>
  );
};

export default PlaceOrder;
