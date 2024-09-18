import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// components
import RootLayout from '../components/Layout/RooLayout';
import Stepper from '../components/PlaceOrderProcess/Stepper';
import ShippingAddress from '../components/PlaceOrderProcess/ShippingAddress';
import OrderSummary from '../components/PlaceOrderProcess/OrderSummary';
import Payment from '../components/PlaceOrderProcess/Payment';
import OrderDone from '../components/PlaceOrderProcess/OrderDone';
import { clearStateAndStorage } from '../utils/ClearStateAndStorage';
import { fetchPersonalDetails } from '../redux/slices/UserSlice';
import { ScreenLoading } from '../components/Loaders';

const PlaceOrder = () => {
  const { status } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [currentStep, setCurrentStep] = useState(1);
  const [notAuthenticated, setNotAuthenticated] = useState(false);

  useEffect(() => {
    if (query.get('step')) setCurrentStep(parseInt(query.get('step')));
    else if (query.get('status')) setCurrentStep(4);
  }, [query.toString()]);

  useEffect(() => {
    status === 'idle' && dispatch(fetchPersonalDetails());
  }, []);

  useEffect(() => {
    if (status === 'failed') {
      clearStateAndStorage();
      setNotAuthenticated(true);
    }
  }, [status]);

  // location.stata have product data that i am passing from PreviewProduct component for buy product
  // and the reason i am passing location.state to the login page is after the user login i will redirect the user to place order Page
  if (notAuthenticated)
    return <Navigate to={'/login'} state={location.state} replace={true} />;

  if (status === 'idle' || status === 'pending') return <ScreenLoading />;

  return (
    <RootLayout footer={false}>
      <div className="placeOrderProcess_container">
        <div className="placeOrderProcess_sub_container">
          <div style={{ padding: '0px 12px' }}>
            <Stepper
              data={[
                { title: 'Delivery Address' },
                { title: 'Order Summary' },
                { title: 'Payment' },
              ]}
              currentStep={currentStep}
            />
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
