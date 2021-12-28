import React from 'react';
import { Link } from 'react-router-dom';
import '../css/MenWomenCard.css';


const MenWomenCard = () => {
    return (
        <div className="menwomencard-main-box">
            <h1>WARDROBE</h1>

            <div className="menwomencard-box">

                <div className="mencard-box">
                    <img src="https://preview.colorlib.com/theme/capitalshop/assets/img/hero/h1_hero1.jpg.webp" alt="not found" />
                    <div className="mencard-content">
                        <Link to="/collections/Men's-Wardrobe"><h2>Men's Fashion</h2></Link>
                        {/* <Link to="/collections/mens"><button>View</button></Link> */}
                    </div>
                </div>

                <div className="womencard-box">
                    <img src="https://preview.colorlib.com/theme/capitalshop/assets/img/hero/h1_hero2.jpg.webp" alt="not found" />
                    <div className="womencard-content">
                        <Link to="/collections/Women's-Wardrobe"><h2>Women's Fashion</h2></Link>
                        {/* <Link to="/collections/womens"><button>View</button></Link> */}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MenWomenCard;
