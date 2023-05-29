import { Header } from "../../shared/Header";
import React from "react";
import "./Details.css";
import { Movie } from "../../models/Movie";

type Data = {
  movie: Movie;
};
export const Details = ({ movie }: Data) => {
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
