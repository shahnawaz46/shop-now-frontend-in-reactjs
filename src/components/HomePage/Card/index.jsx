import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Card = () => {
  return (
    <div className="menwomencard-container">
      <h2>WARDROBE</h2>

      <div className="menwomencard-box">
        <div className="card">
          <img
            src="https://preview.colorlib.com/theme/capitalshop/assets/img/hero/h1_hero1.jpg.webp"
            alt="not found"
          />
          <div className="card-content left">
            {/* <p>
              Men's fashion refers to the styles and trends in clothing,
              accessories, and grooming that are popular among men at a
              particular time
            </p> */}
            <div className="card-heading">
              <Link to="/collections/Men's-Wardrobe">
                <h2>Men's Fashion</h2>
              </Link>
            </div>
            {/* <Link to="/collections/mens"><button>View</button></Link> */}
          </div>
        </div>

        <div className="card">
          <img
            src="https://preview.colorlib.com/theme/capitalshop/assets/img/hero/h1_hero2.jpg.webp"
            alt="not found"
          />
          <div className="card-content right">
            <Link to="/collections/Women's-Wardrobe">
              <h2>Women's Fashion</h2>
            </Link>
            {/* <Link to="/collections/womens"><button>View</button></Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
