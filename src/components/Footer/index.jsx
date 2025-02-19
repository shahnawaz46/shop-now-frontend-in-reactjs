import './style.css';
import {
  FaBuilding,
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from 'react-icons/fa';
import { IoMdCall } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

// import { useSelector } from 'react-redux';

const Footer = () => {
  // const { authenticate } = useSelector((state) => state.user)

  const Icon = {
    fontSize: '20px',
    color: 'black',
    marginRight: '5px',
  };
  return (
    <div className="footer-main-box">
      <div className="footer-first-box">
        <div className="footer-links-box">
          <h4 className="footer-h4">Quick Links</h4>
          <ul>
            <Link to="/home">
              <li>Home</li>
            </Link>
            <Link to="/collections/Men's-Wardrobe">
              <li>Men</li>
            </Link>
            <Link to="/collections/Women's-Wardrobe">
              <li>Women</li>
            </Link>
            <Link to="/top-selling">
              <li>Top Selling</li>
            </Link>
            <Link to="/new-products">
              <li>Newest</li>
            </Link>
            <Link to="/about">
              <li>About us</li>
            </Link>
            <Link to="/help">
              <li>Help</li>
            </Link>
          </ul>
        </div>
        <div className="footer-contact-box">
          <h4 className="footer-h4">Contact us</h4>
          <ul>
            <li>
              <FaBuilding style={Icon} /> New Delhi 91
            </li>
            <li>
              <IoMdCall style={Icon} />
              +91 9999968025
            </li>
            <li>
              <MdEmail style={Icon} />
              shahnawaz85748@gmail.com
            </li>
          </ul>
        </div>
        <div className="footer-links-box">
          <h4 className="footer-h4">ShopNow Policy</h4>
          <ul>
            <Link to="/privacy-policy">
              <li>Privacy Policy</li>
            </Link>
            <Link to="/return-policy">
              <li>Return Policy</li>
            </Link>
            <Link to="/shipping-policy">
              <li>Shipping Policy</li>
            </Link>
            <Link to="/terms-and-services">
              <li>Terms of services</li>
            </Link>
          </ul>
        </div>
        <div className="footer-signup">
          <h4 className="footer-h4">Hey Sign up ?</h4>
          <p>
            Sign up now and be the first to know about exclusive offers, latest
            fashion news & style tips!
          </p>
          {/* {true ? ( */}
          <Link to="/home">
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
          <a href="https://www.facebook.com/">
            <FaFacebookSquare style={{ fontSize: '20px', color: 'black' }} />
          </a>
          <a href="https://www.instagram.com/">
            <FaInstagramSquare
              style={{ fontSize: '20px', color: 'black', margin: '0px 30px' }}
            />
          </a>
          <a href="https://twitter.com/login">
            <FaTwitterSquare style={{ fontSize: '20px', color: 'black' }} />
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
