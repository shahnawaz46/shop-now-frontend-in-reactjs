import React from 'react';
import './style.css';

const Sizes = ({ allSize, productSize, setProductSize }) => {
  return (
    <>
      <div className="preview-size-button-box">
        {Object.keys(allSize).map((item, index) => (
          <button
            key={index}
            onClick={() => setProductSize(item)}
            className={
              productSize === item
                ? 'preview-size-button background-color-black'
                : 'preview-size-button'
            }
          >
            {item}
          </button>
        ))}
      </div>

      <div className="preview-size-detail-box">{allSize?.[productSize]}</div>
    </>
  );
};

export default Sizes;
