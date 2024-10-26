import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { FiShoppingBag } from 'react-icons/fi';
import { RiMenu2Line } from 'react-icons/ri';
import { MdClose, MdPerson } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

// components
import './style.css';
import Cart from '../Cart';
import SearchResults from '../SearchResults';
import axiosInstance from '../../axios/AxiosInstance';

const navLinks = [
  { name: 'Home', link: '/home' },
  { name: "Men's", link: "/collections/Men's-Wardrobe" },
  { name: "Women's", link: "/collections/Women's-Wardrobe" },
  { name: 'Top Selling', link: '/top-selling' },
  { name: 'Newest', link: '/new-products' },
];

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const navigate = useNavigate();

  const [condition, setCondition] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartShow, setShowCart] = useState(false);
  const [searchItems, setSearchItems] = useState({ status: false, result: [] });
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const cartQuantity = () => {
    const quantity = cartItems.reduce((total, value) => total + value.qty, 0);
    return quantity > 99 ? '99+' : quantity;
  };

  const handleSearchBar = async (search) => {
    if (search === '') {
      setSearchItems({ status: false, result: [] });
      return;
    }

    try {
      const res = await axiosInstance.get(`/search/category?search=${search}`);
      setSearchItems({ status: true, result: res.data.result });
      setActiveSuggestion(0);
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  // calling handleSearchBar with the help of debouce for improve search
  const handleChange = debounce(handleSearchBar, 500);

  // for move and select the suggestion of search result
  const handleMoveAndSelect = (e) => {
    if (!searchItems.status) return null;
    if (
      e.key === 'ArrowDown' &&
      activeSuggestion < searchItems.result.length - 1
    ) {
      setActiveSuggestion((prev) => prev + 1);
    } else if (e.key === 'ArrowUp' && activeSuggestion > 0) {
      setActiveSuggestion((prev) => prev - 1);
    } else if (e.key === 'Enter') {
      const { slug } = searchItems.result[activeSuggestion];
      navigate(
        `/collections/${
          slug?.includes('Men') ? "Men's-Wardrobe" : "Women's-Wardrobe"
        }?category=${slug}`
      );
      setSearchItems({ status: false, result: [] });
    }
  };

  useEffect(() => {
    if (condition) {
      document.body.style.overflow = 'hidden';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [condition]);

  // after search query changed then removing search result
  useEffect(() => {
    setSearchItems({ status: false, result: [] });
  }, [location.search]);

  return (
    <>
      <div style={{ backgroundColor: 'black' }}>
        <marquee
          direction="left"
          style={{
            color: 'white',
            margin: '-4px',
            padding: '5px 0px',
            width: '100%',
          }}
        >
          Free Shipping All Over The India
        </marquee>
      </div>

      {/* desktop and tab navbar */}
      <div className="navbar-container">
        <div className="navbar">
          <div className="website-name">
            <Link to="/home">
              <h3>
                <span style={{ color: 'red' }}>Shop</span>Now
              </h3>
            </Link>
          </div>

          <div
            className={condition ? 'navbar-item mobile-navbar' : 'navbar-item'}
          >
            {/* this icon will show only in mobile Navbar */}
            <div className="close-icon" onClick={() => setCondition(false)}>
              <MdClose />
            </div>

            {navLinks.map((nav, index) => (
              <div className="navbar-link" key={index}>
                <NavLink
                  to={nav.link}
                  className={({ isActive }) =>
                    isActive ? 'nav-link-class' : ''
                  }
                  onClick={() => setCondition(false)}
                >
                  {nav.name}
                </NavLink>
              </div>
            ))}
          </div>

          <div className="navbar-icons">
            {/* search bar for large device */}
            <div style={{ position: 'relative' }}>
              <div className="navbar_search_bar">
                <BiSearch
                  style={{
                    fontSize: '25px',
                    color: 'black',
                    cursor: 'pointer',
                  }}
                />
                <input
                  type="text"
                  placeholder="Search item"
                  onChange={(e) => handleChange(e.target.value)}
                  onKeyDown={handleMoveAndSelect}
                />
              </div>

              {/* show search Results */}
              <div className="navbar_search_item">
                {searchItems.status && (
                  <SearchResults
                    result={searchItems.result}
                    activeSuggestion={activeSuggestion}
                  />
                )}
              </div>

              <BiSearch
                className="icon navbar_search_bar_icon"
                onClick={() => setSearch(true)}
              />
            </div>
            <div className="navbar-cart" onClick={() => setShowCart(true)}>
              <FiShoppingBag
                className="icon"
                onClick={() => setShowCart(true)}
              />
              <span>{cartQuantity()}</span>
            </div>
            <Link
              to={'/my-account/address'}
              state={{ from: location.pathname }}
            >
              <MdPerson className="icon profile-icon" />
            </Link>
            <RiMenu2Line
              className="menu-icon"
              onClick={() => setCondition(true)}
            />
          </div>
        </div>

        {/* only for mobile screen */}
        <div>
          {search ? (
            <div className="search-field">
              <BiSearch
                style={{
                  fontSize: '25px',
                  color: 'black',
                  cursor: 'pointer',
                }}
              />
              <input
                type="text"
                placeholder="Search item"
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleMoveAndSelect}
              />
              <MdClose
                style={{ fontSize: '25px', cursor: 'pointer' }}
                onClick={() => setSearch(false)}
              />
            </div>
          ) : null}

          {/* show search Results */}
          <div className="navbar_search_item_mobile">
            {searchItems.status && (
              <SearchResults
                result={searchItems.result}
                activeSuggestion={activeSuggestion}
              />
            )}
          </div>
        </div>
      </div>

      <Cart show={cartShow} setShow={setShowCart} />
    </>
  );
};

export default Navbar;
