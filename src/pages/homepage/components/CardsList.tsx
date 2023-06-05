import "./CardsList.css";
import { Card } from "./Card";
import { Movie } from "../../../models/Movie";

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
    <div
      className={`movie-list-container ${
        moviesList?.length === 0 ? " no-movie" : ""
      }`}
    >
      <div className="movie-list">
        {moviesList.length === 0
          ? "sorry no results"
          : moviesList.map((movie) => {
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
      <div
        className={`pagination ${moviesList.length === 0 ? "no-buttons" : ""}`}
      >
        <button onClick={prevClick} disabled={pageNumber === 1}>
          {"<< previous "}
        </button>
        <span>{pageNumber}</span>
        <button
          onClick={nextClick}
          disabled={pageNumber === 1000 || moviesList.length < 20}
        >
          {"  next  >>"}
        </button>
      </div>
    </div>
  );
};
