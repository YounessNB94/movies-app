import "./CardsList.css";
import { Card } from "./Card";
import { Movie } from "../../../models/Movie";
import { Link } from "react-router-dom";

type movieList = {
  moviesList: Movie[];
};

export const CardsList = ({ moviesList }: movieList) => {
  return (
    <div className="film-list">
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
  );
};
