import React from 'react';
import { IProductSizes } from '../../../types/interfaces/product.interface';
import './style.css';

interface ISizesProps {
  allSize: IProductSizes;
  productSize: keyof IProductSizes | undefined;
  setProductSize: React.Dispatch<
    React.SetStateAction<keyof IProductSizes | undefined>
  >;
}

const Sizes = ({ allSize, productSize, setProductSize }: ISizesProps) => {
  return (
    <>
      <div className="preview-size-button-box">
        {Object.keys(allSize).map((item, index) => {
          const sizeKey = item as keyof IProductSizes;
          return (
            <button
              key={index}
              onClick={() => setProductSize(sizeKey)}
              className={
                productSize === item
                  ? 'preview-size-button background-color-black'
                  : 'preview-size-button'
              }
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="preview-size-detail-box">
        {productSize && allSize[productSize]}
      </div>
    </>
  );
};

export default Sizes;
