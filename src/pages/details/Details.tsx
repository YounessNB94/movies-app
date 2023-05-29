import React from "react";
import "./Details.css";
type DetailMovieProps = {
  title: string;
  poster_path: string;
  overview: string;
  genre_ids: number;
};
export const Details = ({}: DetailMovieProps) => {
  return (
    <>
      <header className="header">
        <a href="#" onclick="location.reload()">
          <h1>MovieApp</h1>
        </a>
      </header>
      <div className="main">
        <div className="film-card">
          <img src="/imgUWOAMT.jpg" alt="image" />
        </div>
        <div className="Details">
          <h1>The Unbearable weight of massive talent</h1>
          <div className="Genre">
            <h2>Genre</h2>
            <p>Action</p>
            <p>Comedy</p>
          </div>
          <div className="Description">
            <h2>Overview</h2>
            <p>
              Moviestar Nick Cage is channeling his iconic characters as he's
              caught between a superfan and a CIA agent.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
