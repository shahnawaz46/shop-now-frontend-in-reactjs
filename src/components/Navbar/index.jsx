import React, { useState, useEffect } from "react";
import "./style.css";
import { Link, NavLink, Redirect, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { RiMenu2Line } from "react-icons/ri";
import { MdClose, MdPerson } from "react-icons/md";
import Cart from "../Cart";
import { useSelector } from "react-redux";

const navLinks = [
  { name: "Home", link: "/home" },
  { name: "Men's", link: "/collections/Men's-Wardrobe" },
  { name: "Women's", link: "/collections/Women's-Wardrobe" },
  { name: "Top Selling", link: "/top-selling" },
  { name: "Newest", link: "/new-products" },
];

const Navbar = () => {
  const [condition, setCondition] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartShow, setShowCart] = useState(false);
  const navigate = useNavigate();

  // const userState = useSelector((state) => state.user)
  const cart = useSelector((state) => state.cart)

  // const checkUserIsLogin = () => {
  //     if (userState.authenticate) {
  //         navigate("/my-account/address")
  //     } else {
  //         navigate("/login")
  //     }
  // }

  // const cartQuantity = (allCartItem) => {
  //     const quantity = allCartItem.reduce((total, value) => total + value.qty, 0)
  //     return quantity > 99 ? '99+' : quantity
  // }

  useEffect(() => {
    if (condition) {
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = "unset");
  }, [condition]);

  return (
    <>
      <div style={{ backgroundColor: "black" }}>
        <marquee
          direction="left"
          style={{
            color: "white",
            margin: "-4px",
            padding: "5px 0px",
            width: "100%",
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
                <span style={{ color: "red" }}>FUZ</span>ICON
              </h3>
            </Link>
          </div>

          <div
            className={condition ? "navbar-item mobile-navbar" : "navbar-item"}
          >
            {/* this icon show only in mobile Navbar */}
            <div className="close-icon" onClick={() => setCondition(false)}>
              <MdClose />
            </div>
            {navLinks.map((nav, index) => (
              <div className="navbar-link" key={index}>
                <NavLink
                  to={nav.link}
                  className={({ isActive }) =>
                    isActive ? "nav-link-class" : ""
                  }
                  onClick={() => setCondition(false)}
                >
                  {nav.name}
                </NavLink>
              </div>
            ))}
          </div>

          <div className="navbar-icons">
            <BiSearch className="icon" onClick={() => setSearch(true)} />
            <div className="navbar-cart" onClick={() => setShowCart(true)}>
              <FiShoppingBag
                className="icon"
                onClick={() => setShowCart(true)}
              />
              <span>{cart?.length > 0 ? cart?.length : 0}</span> 
            </div>
            <Link to={"/my-account/address"}>
              <MdPerson className="icon profile-icon" />
            </Link>
            <RiMenu2Line
              className="menu-icon"
              onClick={() => setCondition(true)}
            />
          </div>
        </div>

        {search ? (
          <div className="search-field">
            <BiSearch
              style={{
                fontSize: "25px",
                color: "black",
                cursor: "pointer",
              }}
            />
            <input type="text" placeholder="Search item" />
            <MdClose
              style={{ fontSize: "25px", cursor: "pointer" }}
              onClick={() => setSearch(false)}
            />
          </div>
        ) : null}
      </div>

      <Cart show={cartShow} setShow={setShowCart} />
    </>
  );
};

export default Navbar;
