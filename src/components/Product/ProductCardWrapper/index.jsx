import { PaginationLoading, ScreenLoading } from '../../Loaders';
import NotFound from '../../NotFound';
import ProductCard from '../../ProductCard';

const ProductCardWrapper = (props) => {
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
            <ProductCard key={product._id} product={product} />
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
