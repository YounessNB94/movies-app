import "./CardsList.css";
import { Card } from "./Card";
import { Movie } from "../../../models/Movie";

type movieList = {
  moviesList: Movie[];
};

export const CardsList = ({ moviesList }: movieList) => {
  return (
    <div className="movie-list">
      {moviesList.map((movie) => {
        return (
          <Card
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
          />
        );
      })}
      {/* {movies.map((movie) => {
        return <Card key={movie.id} id={movie.id} title={movie.title} />;
      })} */}
    </div>
  );
};
