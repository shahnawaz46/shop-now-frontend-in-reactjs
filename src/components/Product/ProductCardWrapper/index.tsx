import React from 'react';
import { IProduct } from '../../../types/interfaces/product.interface';
import { PaginationLoading, ScreenLoading } from '../../Loaders';
import NotFound from '../../NotFound';
import ProductCard from '../ProductCard';
import './style.css';

interface IProductCardWrapperProps {
  isLoading: boolean;
  products: IProduct[];
  errorMsg: string;
  hasFetchNext: string | null;
  fetchNextRef: (node?: Element | null) => void;
}

const ProductCardWrapper = (props: IProductCardWrapperProps) => {
  const { isLoading, products, errorMsg, hasFetchNext, fetchNextRef } = props;

  // console.log(hasFetchNext);
  if (isLoading) {
    return <ScreenLoading position="absolute" />;
  }

  return (
    <>
      {products && products.length > 0 ? (
        <div className="product-container">
          {products?.map((product) => (
            <React.Fragment key={product._id}>
              <ProductCard product={product} />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <NotFound>{errorMsg}</NotFound>
      )}

      {/* loading gif for pagination(show before fetching more product) */}
      {hasFetchNext && (
        <div ref={fetchNextRef}>
          <PaginationLoading />
        </div>
      )}
    </>
  );
};

export default ProductCardWrapper;
