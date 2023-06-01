import "./CardsList.css";
import { Card } from "./Card";
import { Movie } from "../../../models/movie";
import { Link } from "react-router-dom";

type movieList = {
  moviesList: Movie[];
  pageNumber: number;
  nextClick: (event: React.MouseEvent<HTMLElement>) => void;
  prevClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export const CardsList = ({
  moviesList,
  pageNumber,
  nextClick,
  prevClick,
}: movieList) => {
  return (
    <div>
      <div className="movie-list">
        {moviesList.map((movie) => {
          return (
            <Card
              key={movie.id}
              id={movie.id}
              title={movie.title}
              name={movie.name}
              poster_path={movie.poster_path}
            />
          );
        })}
      </div>
      <div className="pagination">
        <button onClick={prevClick} disabled={pageNumber === 1}>
        {  "<< previous "}
        </button>
        <span>{pageNumber}</span>
        <button onClick={nextClick} disabled={pageNumber === 1000}>
        {"  next  >>"}
        </button>
      </div>
    </div>
  );
};
