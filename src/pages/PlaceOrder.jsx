import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// components
import RootLayout from '../components/Layout/RooLayout';
import Stepper from '../components/PlaceOrderProcess/Stepper';
import ShippingAddress from '../components/PlaceOrderProcess/ShippingAddress';
import OrderSummary from '../components/PlaceOrderProcess/OrderSummary';
import Payment from '../components/PlaceOrderProcess/Payment';
import OrderDone from '../components/PlaceOrderProcess/OrderDone';

const PlaceOrder = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [currentStep, setCurrentStep] = useState(1);

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue =
  //       'Are you sure you want to leave? All unsaved changes will be lost.';

  //     return e.returnValue;
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  // });

  useEffect(() => {
    query.get('step')
      ? setCurrentStep(query.get('step'))
      : query.get('status')
      ? setCurrentStep(4)
      : null;
  }, [query.toString()]);

  return (
    <RootLayout footer={false}>
      <div className='placeOrderProcess_container'>
        <div className='placeOrderProcess_sub_container'>
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

          {currentStep == 1 ? (
            <ShippingAddress />
          ) : currentStep == 2 ? (
            <OrderSummary />
          ) : currentStep == 3 ? (
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
