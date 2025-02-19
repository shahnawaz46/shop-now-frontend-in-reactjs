export const totalRating = (reviews) => {
  let sumOfRating = reviews.reduce((total, value) => value.rating + total, 0);
  sumOfRating = (sumOfRating * 5) / (reviews.length * 5);
  return sumOfRating > 0 ? sumOfRating.toFixed(1) : 0;
};
