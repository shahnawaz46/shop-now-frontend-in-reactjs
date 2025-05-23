export const apiUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:9000/api/user"
    : "https://ecommerce-server-1cz2.onrender.com/api/user";

export const giveMeBannerImages = (image_link: string) => {
  return `https://fuzicon-backend-server.herokuapp.com/BannerImages/${image_link}`;
};
