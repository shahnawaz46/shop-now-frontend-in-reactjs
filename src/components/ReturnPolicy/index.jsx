import './style.css';

const ReturnPolicy = () => {
  return (
    <div className="return-policy-container">
      <h3 className="return-policy-heading">DELIVERY & RETURNS</h3>
      <div className="return-policy-sub-container">
        <div className="return-policy-content">
          {/* <h4 className="return-policy-sub-heading">FREE SHIPPING</h4> */}
          <h4 className="return-policy-sub-heading">SHIPPING</h4>
          {/* <p className="return-policy-description">
            Free shipping for all purchases over Rs 1500. Shipping charges are
            Rs 150 for any order below this.
          </p> */}
          <p className="return-policy-description">
            Shipping charges are non-refundable.
          </p>
        </div>
        <div className="return-policy-content">
          <h4 className="return-policy-sub-heading">SUPPORT</h4>
          <p className="return-policy-description">
            Please email us at{' '}
            <span style={{ fontWeight: '700' }}>shahnawaz85748@gmail.com</span>{' '}
            or call us during office hours Monday thru Saturday at{' '}
            <span style={{ fontWeight: '700' }}>1234567890</span> Whatsapp us on{' '}
            <span style={{ fontWeight: '700' }}>1234567890</span>
          </p>
        </div>
        <div className="return-policy-content">
          <h4 className="return-policy-sub-heading">EXCHANGE</h4>
          <p className="return-policy-description">
            Simply exchange for a different size at no cost to you!
          </p>
        </div>
        <div className="return-policy-content">
          <h4 className="return-policy-sub-heading">RETURN</h4>
          <p className="return-policy-description">
            We accept return of all items that are not on sale. Shipping fees
            and COD charges are non-refundable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
