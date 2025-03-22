import './style.css';
import {
  FaBuilding,
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from 'react-icons/fa';
import { IoMdCall } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router';

// import { useSelector } from 'react-redux';

const Footer = () => {
  // const { authenticate } = useSelector((state) => state.user)

  return (
    <div className="footer-main-box">
      <div className="footer-first-box">
        <div className="footer-links-box">
          <h2 className="footer-h2">Quick Links</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/collections/Men's-Wardrobe">Men</Link>
            </li>
            <li>
              <Link to="/collections/Women's-Wardrobe">Women</Link>
            </li>
            <li>
              <Link to="/top-selling">Top Selling</Link>
            </li>
            <li>
              <Link to="/new-products">Newest</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </div>
        <div className="footer-contact-box">
          <h2 className="footer-h2">Contact us</h2>
          <ul>
            <li>
              <FaBuilding /> New Delhi 91
            </li>
            <li>
              <IoMdCall />
              +91 9999968025
            </li>
            <li>
              <MdEmail />
              shahnawaz85748@gmail.com
            </li>
          </ul>
        </div>
        <div className="footer-links-box">
          <h2 className="footer-h2">ShopNow Policy</h2>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/return-policy">Return Policy</Link>
            </li>
            <li>
              <Link to="/shipping-policy">Shipping Policy</Link>
            </li>
            <li>
              <Link to="/terms-and-services">Terms of services</Link>
            </li>
          </ul>
        </div>
        <div className="footer-signup">
          <h2 className="footer-h2">Hey Sign up ?</h2>
          <p>
            Sign up now and be the first to know about exclusive offers, latest
            fashion news & style tips!
          </p>
          {/* {true ? ( */}
          <Link to="/">
            <button>lets Shopping</button>
          </Link>
          {/* ) : (
            <Link to="/signup">
              <button>Sign up</button>
            </Link>
          )} */}
        </div>
      </div>

      <div className="footer-second-box">
        <div className="footer-second-box-icon">
          <a href="https://www.facebook.com/" aria-label="facebook">
            <FaFacebookSquare
              style={{ fontSize: '20px', color: 'var(--text-primary)' }}
            />
          </a>
          <a href="https://www.instagram.com/" aria-label="instagram">
            <FaInstagramSquare
              style={{
                fontSize: '20px',
                color: 'var(--text-primary)',
                margin: '0px 30px',
              }}
            />
          </a>
          <a href="https://twitter.com/login" aria-label="twitter">
            <FaTwitterSquare
              style={{ fontSize: '20px', color: 'var(--text-primary)' }}
            />
          </a>
        </div>
        <div className="footer-second-box-content">
          {/* <p>
            Explore the best trends for men and women at ShopNow! Clothes, shoes
            and cool accessories for a new season are available now at ShopNow.
          </p> */}
        </div>
        <div className="footer-copyright-box">
          <span>
            &copy;copyright {new Date().getFullYear()} - ShopNow. All rights
            reserved
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
