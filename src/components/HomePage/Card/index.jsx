import { Link } from 'react-router';
import './style.css';
import HeadingAndParagraph from '../HeadingAndParagraph';

const Card = () => {
  return (
    <div className="menwomencard-container">
      <HeadingAndParagraph heading={'WARDROBE'} />

      <div className="menwomencard-box">
        <div className="card">
          <img src="./men-wardrobe.webp" alt="men-wardrobe" loading="lazy" />
          <div className="card-content left">
            {/* <p>
              Men's fashion refers to the styles and trends in clothing,
              accessories, and grooming that are popular among men at a
              particular time
            </p> */}

            <Link to="/collections/Men's-Wardrobe">
              <h2>Men&apos;s Fashion</h2>
            </Link>

            {/* <Link to="/collections/mens"><button>View</button></Link> */}
          </div>
        </div>

        <div className="card">
          <img src="./women-wardrobe.webp" alt="not found" loading="lazy" />
          <div className="card-content right-side">
            <Link to="/collections/Women's-Wardrobe">
              <h2>Women&apos;s Fashion</h2>
            </Link>
            {/* <Link to="/collections/womens"><button>View</button></Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
