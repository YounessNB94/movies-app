import { Category } from "../../../models/category";
import "./filters.css";

type FilterProps = {
  categoryList: Category[];
  radioClick: (event: React.MouseEvent<HTMLElement>) => void;
  searchMovie: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Filters = ({
  radioClick,
  searchMovie,
  categoryList,
}: FilterProps) => {
  return (
    <div className="sidebar">
      <ul className="menu" onClick={radioClick}>
        <li className="search-input">
          <h3>Search</h3>
          <div className="input-wrapper">
            <input
              type="search"
              placeholder="Search for movie..."
              onChange={searchMovie}
            />
          </div>
        </li>
        <li>
          <h3>Genre</h3>
        </li>
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
                <div className="radio-content">
                  <i className="fa-brands fa-quora"></i>
                  <label>{value.name}</label>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
