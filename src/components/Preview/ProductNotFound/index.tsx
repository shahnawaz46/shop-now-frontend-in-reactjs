import { useNavigate } from "react-router";
import "./style.css"; // Import the external CSS file

const ProductNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="product-not-found-container">
      <h1>🛒 Product Not Found</h1>
      <p>
        Sorry, the product you're looking for doesn't exist or is no longer
        available.
      </p>
      <button className="back-home-btn" onClick={() => navigate(-1)}>
        Back to Home
      </button>
    </div>
  );
};

export default ProductNotFound;
