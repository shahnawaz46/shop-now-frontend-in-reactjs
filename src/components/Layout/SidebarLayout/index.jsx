import { useEffect, useState } from 'react';
import './style.css';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

// slider
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// components
import FilterIcon from '../../../asset/filter.png';

const SidebarLayout = ({ children, subCategory }) => {
  const navigate = useNavigate();

  const location = useLocation(); // useLocation will return object with multiple key and value like pathname, search query and etc.
  const searchParam = new URLSearchParams(location.search); // searchParam is used for manipulation query parameters like get, append, set and etc.

  const [range, setRange] = useState([0, 2500]);
  const [showFilter, setShowFilter] = useState(false);

  const appendQuery = (key, value) => {
    searchParam.has(key)
      ? searchParam.set(key, value)
      : searchParam.append(key, value);

    navigate(`?${searchParam.toString()}`);
  };

  const getQuery = (key) => searchParam.get(key);

  useEffect(() => {
    const price = searchParam.get('price');
    price && setRange(price.split('-').map((item) => parseInt(item)));
  }, [searchParam.toString()]);

  return (
    <div className="sidebar-container">
      {/* left side (filter) */}
      <div
        className="filter-icon-container"
        onClick={() => setShowFilter(true)}
      >
        <img src={FilterIcon} alt="filter-icon" />
        <h2 style={{ fontSize: '20px', fontWeight: 400 }}>Filter</h2>
      </div>

      <div className={showFilter ? 'filter show-filter' : 'filter'}>
        {/* filter heading */}
        <div className="filter-space filter-close-icon-container">
          <h2 style={{ fontSize: '22px', fontWeight: 500 }}>Filters</h2>
          <IoMdClose
            className="filter-close-icon"
            onClick={() => setShowFilter(false)}
          />
        </div>

        {/* price slider/range */}
        <div className="filter-space">
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            Price
          </h3>

          <div className="slider-container">
            <Slider
              range
              value={[...range]}
              min={0}
              max={2500}
              step={500}
              allowCross={false}
              pushable={true}
              count={1}
              onChange={(e) => {
                setRange(e);
                appendQuery('price', e.join('-'));
              }}
            />
          </div>

          <div className="slider-field-container">
            <div className="slider-field">
              <span>Min</span>
              <div type="number" value="7500">
                {range[0]}
              </div>
            </div>
            <div>-</div>
            <div className="slider-field">
              <span>Max</span>
              <div type="number" value="7500">
                {range[1] === 2500 ? '2500+' : range[1]}
              </div>
            </div>
          </div>
        </div>

        {/* catogories */}
        <div className="filter-space">
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            Categories
          </h3>
          <div className="category">
            {subCategory.length > 0 &&
              subCategory[0].children.map((item) => (
                <div
                  key={item.slug}
                  onClick={() => appendQuery('category', item.slug)}
                  className="category-name"
                  style={{
                    color:
                      getQuery('category') === item.slug
                        ? '#000'
                        : 'var(--tertiary-color)',
                    fontWeight: getQuery('category') === item.slug ? 500 : 400,
                  }}
                >
                  <MdOutlineKeyboardArrowLeft style={{ fontSize: '18px' }} />
                  <span style={{ fontSize: '16px' }}>{item.categoryName}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* right side (products) */}
      <div className="right">{children}</div>
    </div>
  );
};

export default SidebarLayout;
