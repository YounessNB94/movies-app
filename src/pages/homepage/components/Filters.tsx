import { Category } from "../../../models/category";
import "./filters.css";
import { debounce } from "lodash";
type FilterProps = {
  categoryList: Category[];
  radioClick: (event: React.MouseEvent<HTMLElement>) => void;
  searchMovie: (event: React.ChangeEvent<HTMLInputElement>) => void;
  categoryId: string;
};

export const Filters = ({
  radioClick,
  searchMovie,
  categoryList,
  categoryId,
}: FilterProps) => {
  const debouncedSearchMovie = debounce(searchMovie, 200);
  return (
    <div className="sidebar">
      <ul className="menu">
        <li className="search-input">
          <h3>Search</h3>
          <div className="input-wrapper">
            <input
              type="search"
              placeholder="Search for movie..."
              onChange={debouncedSearchMovie}
            />
          </div>
        </li>
        <li>
          <h3>Genre</h3>
        </li>
        
        {/* event delegation for handling category clicks */}
        <div onClick={radioClick}>
          {categoryList.map((value) => {
            return (
              <li key={value.id}>
                <div className="input-container option-style">
                  <input
                    type="radio"
                    name="category"
                    id={`${value.id}`}
                    value={`${value.name}`}
                  />
                  <div
                    className={`radio-content ${
                      value.id.toString() === categoryId ? "check-radio" : ""
                    }`}
                  >
                    <i className="fa-brands fa-quora"></i>
                    <label>{value.name}</label>
                  </div>
                </div>
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
};
