import { useEffect, useState } from "react";
import "./style.css";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useSearchParams } from "react-router";
import { IoMdClose } from "react-icons/io";

// slider
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// components
import FilterIcon from "../../../asset/filter.png";
import { IChildren } from "../../../types/interfaces";
import { ICategory } from "../../../types/interfaces/category.interface";

interface ISidebarLayoutProps extends IChildren {
  subCategory: ICategory[];
}

const SidebarLayout = ({ children, subCategory }: ISidebarLayoutProps) => {
  const [searchParams, setSearhParams] = useSearchParams();

  const [range, setRange] = useState<number[]>([0, 2500]);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const appendQuery = (key: string, value: string) => {
    searchParams.set(key, value); // first set key value in searchParams state
    setSearhParams(searchParams); // then update searchParams state
  };

  const getQuery = (key: string) => searchParams.get(key);

  useEffect(() => {
    const price = searchParams.get("price");
    if (price) {
      setRange(price.split("-").map((item) => parseInt(item)));
    }
  }, [searchParams.toString()]);

  return (
    <div className="sidebar-container">
      {/* left side (filter) */}
      <div
        className="filter-icon-container"
        onClick={() => setShowFilter(true)}
      >
        <img src={FilterIcon} alt="filter-icon" />
        <h2 className="filter-h2">Filter</h2>
      </div>

      <div className={showFilter ? "filter show-filter" : "filter"}>
        {/* filter heading */}
        <div className="filter-space filter-close-icon-container">
          <h2 className="filter-h2">Filters</h2>
          <IoMdClose
            className="filter-close-icon"
            onClick={() => setShowFilter(false)}
          />
        </div>

        {/* price slider/range */}
        <div className="filter-space">
          <h3 className="filter-h3">Price</h3>

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
                if (Array.isArray(e)) {
                  setRange(e);
                  appendQuery("price", e.join("-"));
                }
              }}
            />
          </div>

          <div className="slider-field-container">
            <div className="slider-field">
              <span>Min</span>
              <div>{range[0]}</div>
            </div>
            <div style={{ color: "var(--text-primary)" }}>-</div>
            <div className="slider-field">
              <span>Max</span>
              <div>{range[1] === 2500 ? "2500+" : range[1]}</div>
            </div>
          </div>
        </div>

        {/* catogories */}
        <div className="filter-space">
          <h3 className="filter-h3">Categories</h3>
          <div className="category">
            {subCategory.length > 0 &&
              subCategory.map((item) => (
                <div
                  key={item.slug}
                  onClick={() => appendQuery("category", item.slug)}
                  className="category-name"
                  style={{
                    color:
                      getQuery("category") === item.slug
                        ? "var(--text-primary)"
                        : "var(--text-secondary)",
                    fontWeight: getQuery("category") === item.slug ? 500 : 400,
                  }}
                >
                  <MdOutlineKeyboardArrowLeft style={{ fontSize: "18px" }} />
                  <span style={{ fontSize: "1rem" }}>{item.categoryName}</span>
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
