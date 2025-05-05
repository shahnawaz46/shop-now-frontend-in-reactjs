import { IProductReviews } from '../types/interfaces/product.interface';

export const totalRating = (reviews: IProductReviews[]) => {
  let sumOfRating = reviews.reduce((total, value) => value.rating + total, 0);
  sumOfRating = (sumOfRating * 5) / (reviews.length * 5);
  return sumOfRating > 0 ? sumOfRating.toFixed(1) : 0;
};
