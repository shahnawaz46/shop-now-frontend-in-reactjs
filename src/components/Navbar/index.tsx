import { useState, useEffect, use } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { BiSearch } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { RiMenu2Line } from "react-icons/ri";
import { MdClose, MdPerson } from "react-icons/md";
import debounce from "lodash/debounce";

// components
import "./style.css";
import Cart from "../Cart";
import SearchResults from "../SearchResults";
import axiosInstance from "../../axios/AxiosInstance";
import { useAppSelector } from "../../redux/hooks";
import { ISearchProduct } from "../../types/interfaces/product.interface";
import { handleAxiosError } from "../../utils/HandleAxiosError";
import { getNameInitials } from "../../utils/Initials";

export const navLinks = [
  { name: "Home", link: "/" },
  { name: "Men's", link: "/collections/Men's-Wardrobe" },
  { name: "Women's", link: "/collections/Women's-Wardrobe" },
  { name: "Top Selling", link: "/top-selling" },
  { name: "Newest", link: "/new-products" },
];

interface ISearchItems {
  status: boolean;
  result: ISearchProduct[];
}

const Navbar = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { personalDetails } = useAppSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();

  const [condition, setCondition] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [cartShow, setShowCart] = useState<boolean>(false);
  const [searchItems, setSearchItems] = useState<ISearchItems>({
    status: false,
    result: [],
  });
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);

  const cartQuantity = () => {
    const quantity = cartItems.reduce((total, value) => total + value.qty, 0);
    return quantity > 99 ? "99+" : quantity;
  };

  const handleSearchBar = async (search: string) => {
    const sanitizedInput = search.trim();
    if (sanitizedInput === "") {
      setSearchItems({ status: false, result: [] });
      return;
    }

    try {
      const res = await axiosInstance.get(
        `/category/search?query=${sanitizedInput}`
      );
      setSearchItems({ status: true, result: res.data.result });
      setActiveSuggestion(0);
    } catch (error) {
      handleAxiosError({ error });
    }
  };

  // calling handleSearchBar with the help of debouce for improve search
  const handleChange = debounce(handleSearchBar, 500);

  // for move and select the suggestion of search result
  const handleMoveAndSelect = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchItems.status) return null;
    if (
      e.key === "ArrowDown" &&
      activeSuggestion < searchItems.result.length - 1
    ) {
      setActiveSuggestion((prev) => prev + 1);
    } else if (e.key === "ArrowUp" && activeSuggestion > 0) {
      setActiveSuggestion((prev) => prev - 1);
    } else if (e.key === "Enter") {
      const { slug } = searchItems.result[activeSuggestion];
      navigate(
        `/collections/${
          slug?.includes("Men") ? "Men's-Wardrobe" : "Women's-Wardrobe"
        }?category=${slug}`
      );
      setSearchItems({ status: false, result: [] });
    }
  };

  useEffect(() => {
    if (condition) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [condition]);

  // after search query changed then removing search result
  useEffect(() => {
    setSearchItems({ status: false, result: [] });
  }, [location.search]);

  return (
    <>
      {/* desktop and tab navbar */}
      <div className="navbar-container">
        <div className="navbar">
          <div className="website-name">
            <Link to="/" style={{ color: "var(--text-primary)" }}>
              <h3>
                <span style={{ color: "var(--primary-color)" }}>Shop</span>Now
              </h3>
            </Link>
          </div>

          <div
            className={condition ? "navbar-item mobile-navbar" : "navbar-item"}
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
            {/* search bar for large device */}
            <div style={{ position: "relative" }}>
              <div className="navbar_search_bar">
                <BiSearch className="navbar_search_icon" />
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
                className="navbar_search_bar_icon"
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
              to={"/my-account/address"}
              state={{ from: location.pathname }}
              aria-label="profile"
              style={{ color: "var(--text-primary)" }}
            >
              {personalDetails ? (
                personalDetails?.profilePicture ? (
                  <img
                    src={personalDetails.profilePicture}
                    alt="Profile"
                    className="icon profile-icon-present"
                  />
                ) : (
                  <div className="profile-user-icon-name">
                    {getNameInitials(
                      personalDetails?.firstName +
                        " " +
                        personalDetails.lastName
                    )}
                  </div>
                )
              ) : (
                <MdPerson className="icon profile-icon" />
              )}
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
              <BiSearch className="navbar_search_icon" />
              <input
                type="text"
                placeholder="Search item"
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleMoveAndSelect}
              />
              <MdClose
                style={{
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                }}
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
