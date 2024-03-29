export const apiUrl =
  window.location.hostname === 'localhost'
    ? 'http://localhost:9000/api'
    : 'https://ecommerce-server-1cz2.onrender.com/api';

export const giveMeBannerImages = (image_link) => {
  return `https://fuzicon-backend-server.herokuapp.com/BannerImages/${image_link}`;
};
