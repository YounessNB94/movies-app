import "./CardsList.css";
import { Card } from "./Card";
import { movieType } from "../../../App";

type movieList = {
  moviesList: movieType[];
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
            img={movie.backdrop_path}
          />
        );
      })}
      {/* {movies.map((movie) => {
        return <Card key={movie.id} id={movie.id} title={movie.title} />;
      })} */}
    </div>
  );
};
