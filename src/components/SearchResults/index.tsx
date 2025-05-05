import { Link } from 'react-router';

// components
import './style.css';
import { ISearchProduct } from '../../types/interfaces/product.interface';

interface ISearchResultsProps {
  result: ISearchProduct[];
  activeSuggestion: number;
}

const SearchResults = ({ result, activeSuggestion }: ISearchResultsProps) => {
  return (
    <div>
      <ul className="searchResult_ul_container">
        {result.length > 0 ? (
          result.map((item, index) => (
            <li key={index}>
              <Link
                to={`/collections/${
                  item?.slug?.includes('Men')
                    ? "Men's-Wardrobe"
                    : "Women's-Wardrobe"
                }?category=${item?.slug}`}
                className={`searchResult_li_a ${
                  activeSuggestion === index ? 'searchResult_li_a_active' : ''
                }`}
              >
                {item.categoryName}
              </Link>
            </li>
          ))
        ) : (
          <li>
            <span className="searchResult_li_a">No Result Found</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
