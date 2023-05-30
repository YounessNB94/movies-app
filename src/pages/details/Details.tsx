import { Header } from "../../shared/Header";
import React, { useEffect, useState } from "react";
import "./Details.css";
import { Movie } from "../../models/Movie";
import { useLocation } from "react-router-dom";
import { getMovieById } from "../../api/Movie";

export const Details = () => {
  const location = useLocation();
  const id = location.state.id;

  const [movie, setMovie] = useState<Movie>({
    id: "",
    title: "",
    poster_path: "",
  });
  useEffect(() => {
    const getMovie = async () => {
      const data = await getMovieById(id);
      setMovie(data);
      console.log(movie);
    };
    getMovie();
  }, []);

  if (!movie) {
    return <div>WOT?</div>;
  }

  return (
    <>
      <header className="header">
        <a href="#">
          <h1>MovieApp</h1>
        </a>
      </header>
      <div className="main">
        <div className="film-card">
          <img
            src={`http://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt="image"
          />
        </div>
        <div className="Details">
          <h1>{movie.title ? movie.title : movie.name}</h1>
          <div className="Genre">
            <h2>Genre</h2>
            {movie.genres?.map((type) => {
              return <p key={type.id}>{type.name}</p>;
            })}
          </div>
          <div className="Description">
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};
