import { Header } from "../../shared/Header";
import { useEffect, useState } from "react";
import "./Details.css";
import { Movie } from "../../models/Movie";
import { useLocation } from "react-router-dom";
import { getMovieById } from "../../api/MovieApiCalls";

import { Link } from "react-router-dom";
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
    return <div>Not valid Movie</div>;
  }

  return (
    <>
      <div>
        <Header />
        <div className="main-detail">
          <div className="film-card">
            <img
              src={`http://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt="image"
            />
          </div>

          <div className="Details">
            <h1>{movie.title ? movie.title : movie.name}</h1>
            <div className="title-Genre">
              <h2>Genre</h2>
              <div className="Genre">
                {movie.genres?.map((type) => {
                  return (
                    <Link to={`/`} key={type.id} state={{ id: type.id }}>
                      <button key={type.id}>{type.name}</button>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="Description">
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
