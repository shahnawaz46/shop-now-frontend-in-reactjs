import React, { useState } from 'react';
import './style.css';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Link, useParams } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

// components
import FilterIcon from '../../../asset/filter.png';

const SidebarLayout = ({ children, subCategory, subSlug }) => {
  const [range, setRange] = useState([0, 2500]);
  const param = useParams();
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="sidebar-container">
      {/* left side (filter) */}
      <div
        className="filter-icon-container"
        onClick={() => setShowFilter(true)}
      >
        <img src={FilterIcon} alt="filter-icon" />
        <h2 style={{ fontSize: '20px', fontWeight: 500 }}>Filter</h2>
      </div>

      <div className={showFilter ? 'filter show-filter' : 'filter'}>
        {/* filter heading */}
        <div className="filter-space filter-close-icon-container">
          <h2 style={{ fontSize: '20px', fontWeight: 500 }}>Filters</h2>
          <IoMdClose
            className="filter-close-icon"
            onClick={() => setShowFilter(false)}
          />
        </div>

        {/* price slider/range */}
        <div className="filter-space">
          <h3
            style={{
              fontSize: '15px',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            Price
          </h3>

          <div className="slider-container">
            <Slider
              range
              defaultValue={[0, 2500]}
              min={0}
              max={2500}
              step={500}
              allowCross={false}
              pushable={true}
              count={1}
              onChange={(e) => setRange(e)}
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
              fontSize: '15px',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            Categories
          </h3>
          <div className="category">
            {subCategory.map((item) => (
              <Link
                key={item.slug}
                to={`/collections/${subSlug}/${item.slug}`}
                className="category-name"
                style={{
                  color: param?.subSlug === item.slug ? '#000' : '#878787',
                  fontWeight: param?.subSlug === item.slug ? 500 : 400,
                }}
              >
                <MdOutlineKeyboardArrowLeft style={{ fontSize: '18px' }} />
                <span style={{ fontSize: '16px' }}>{item.categoryName}</span>
              </Link>
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
