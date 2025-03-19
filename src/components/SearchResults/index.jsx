import { Link } from 'react-router';

// components
import './style.css';

const SearchResults = ({ result, activeSuggestion }) => {
  return (
    <div>
      <ul className="searchResult_ul_container">
        {result.length > 0 ? (
          result.map((item, index) => (
            <li
              key={index}
              className="searchResult_li"
              style={{
                backgroundColor: activeSuggestion === index ? 'aliceblue' : '',
              }}
            >
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
          <li className="searchResult_li">No Result Found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
