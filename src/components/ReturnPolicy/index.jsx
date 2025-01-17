import React from 'react';
import './style.css';

const ReturnPolicy = () => {
  return (
    <div className="return-main-box">
      <h3>DELIVERY & RETURNS</h3>
      <div className="return-second-box">
        <div className="return-content-box">
          {/* <h4>FREE SHIPPING</h4> */}
          <h4>SHIPPING</h4>
          {/* <p>
            Free shipping for all purchases over Rs 1500. Shipping charges are
            Rs 150 for any order below this.
          </p> */}
          <p>Shipping charges are non-refundable.</p>
        </div>
        <div className="return-content-box">
          <h4>SUPPORT</h4>
          <p>
            Please email us at{' '}
            <span style={{ fontWeight: '700' }}>contact@shopnow.co</span> or
            call us during office hours Monday thru Saturday at{' '}
            <span style={{ fontWeight: '700' }}>1234567890</span> Whatsapp us on{' '}
            <span style={{ fontWeight: '700' }}>1234567890</span>
          </p>
        </div>
        <div className="return-content-box">
          <h4>EXCHANGE</h4>
          <p>Simply exchange for a different size at no cost to you!</p>
        </div>
        <div className="return-content-box">
          <h4>RETURN</h4>
          <p>
            We accept return of all items that are not on sale. Shipping fees
            and COD charges are non-refundable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
