import React from 'react';
import { Link } from 'react-router-dom';

// components
import './style.css';

const SearchResults = ({ result }) => {
  return (
    <div>
      <ul className='searchResult_ul_container'>
        {result.length > 0 ? (
          result.map((item) => (
            <li className='searchResult_li'>
              <Link
                to={`/collections/${
                  item?.slug?.includes('Men')
                    ? "Men's-Wardrobe"
                    : "Women's-Wardrobe"
                }?category=${item?.slug}`}
              >
                {item.categoryName}
              </Link>
            </li>
          ))
        ) : (
          <li className='searchResult_li'>No Result Found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
