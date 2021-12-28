import React, { useState, useEffect } from 'react'
import '../css/Navbar.css'
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Cart from './Cart';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [condition, setCondition] = useState(false)
    const [search, setSearch] = useState(false)
    const [cartShow, setShowCart] = useState(false)
    const history = useHistory()

    const userState = useSelector((state) => state.user)
    const { allCartItem } = useSelector((state) => state.cart)

    const checkUserIsLogin = () => {
        if (userState.authenticate) {
            history.push("/my-account/address")
        } else {
            history.push("/login")
        }
    }

    const cartQuantity = (allCartItem) => {
        const quantity = allCartItem.reduce((total, value) => total + value.qty, 0)
        return quantity > 99 ? '99+' : quantity
    }

    useEffect(() => {
        if (condition) {
            document.body.style.overflow = 'hidden';
        }
        return () => document.body.style.overflow = 'unset';
    }, [condition])

    return (

        <>
            <div style={{ backgroundColor: 'black' }}>
                <marquee direction="left" style={{ color: 'white', margin: '-4px', padding: '5px 0px', width: '100%' }}>Free Shipping All Over The India</marquee>
            </div>
            {/* desktop and tab navbar */}
            <div className="navbar">
                <div className="navbar-desktop-main-box">
                    <div className="Navbar-website-name-box">
                        <Link to="/home"><h3><span style={{ color: "red" }}>FUZ</span>ICON</h3></Link>
                    </div>

                    <div className={condition ? "navbar-desktop-category-box show-navbar" : "navbar-desktop-category-box"}>
                        {/* this icon show only in mobile Navbar */}
                        <div className="close-icon" onClick={() => setCondition(false)}>
                            <CloseIcon />
                        </div>
                        <div className="navbar-link">
                            <NavLink to="/home" exact activeClassName="nav-link-class" onClick={() => setCondition(false)}>Home</NavLink>
                        </div>
                        <div className="navbar-link">
                            <NavLink to="/collections/Men's-Wardrobe" activeClassName="nav-link-class" onClick={() => setCondition(false)}>Men's</NavLink>
                        </div>
                        <div className="navbar-link">
                            <NavLink to="/collections/Women's-Wardrobe" activeClassName="nav-link-class" onClick={() => setCondition(false)}>Women's</NavLink>
                        </div>
                        <div className="navbar-link">
                            <NavLink to="/top-selling" activeClassName="nav-link-class" onClick={() => setCondition(false)}>Top Selling</NavLink>
                        </div>
                        <div className="navbar-link">
                            <NavLink to="/newest-products" activeClassName="nav-link-class" onClick={() => setCondition(false)}>Newest</NavLink>
                        </div>
                    </div>

                    <div className="navar-search-avatar-box">
                        <div className="navbar-avatar-box">
                            <div className="navbar-icons">
                                <SearchIcon className="icon" onClick={() => setSearch(true)} />
                            </div>

                            <div className="navbar-cart" onClick={() => setShowCart(true)}>
                                <LocalMallOutlinedIcon className="icon" />
                                <span>{allCartItem ? cartQuantity(allCartItem) : 0}</span>
                            </div>

                            <div className="navbar-icons">
                                <PersonIcon className="icon" onClick={checkUserIsLogin} />
                            </div>

                            <div className="navbar-menu">
                                <MenuIcon className="menu-icon" onClick={() => setCondition(true)} />
                            </div>
                        </div>
                    </div>
                </div>

                {
                    search ?
                        <div className="navbar-search-bar-box-two">
                            <SearchIcon style={{ width: '30px', height: ' 25px', color: 'black', cursor: "pointer" }} />
                            <input type="text" placeholder="Search item" />
                            <CloseIcon onClick={() => setSearch(false)} />
                        </div> :
                        null
                }

            </div>

            <Cart show={cartShow} setShow={setShowCart} />
        </>
    )
}

export default Navbar;