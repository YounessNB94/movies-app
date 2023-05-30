import { Details } from "./pages/details/Details.tsx";

import React, { useEffect, useState } from "react";

import "./App.css";
import { Header } from "./shared/Header";
import { Filters } from "./pages/homepage/components/Filters";
import { CardsList } from "./pages/homepage/components/CardsList";
import { getData } from "./api/data";
import { Categories } from "./models/Categories.ts";
import { MoviesList } from "./models/MoviesList";
import { Movie } from "./models/Movie.ts";
import { getCategories, getMovieById } from "./api/Movie.ts";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [categoryList, setCategoryList] = useState<Categories | null>(null);
  const [moviesArraysList, setMoviesArraysList] = useState<Movie[]>([
    {
      id: "",
      title: "",
      poster_path: "",
    },
  ]);

  const [searchField, setSearchField] = useState(moviesArraysList);
  const [movie, setMovie] = useState<Movie>({
    id: "",
    title: "",
    poster_path: "",
  });

  const getMovies = async () => {
    const movieCall = await getData<MoviesList>(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${
        import.meta.env.VITE_API_KEY
      }&page=1`
    );

    setMoviesArraysList(movieCall.results);
  };
  useEffect(() => {
    getMovies();
  }, []);

  const getMoviesByCategory = async (id: Number) => {
    const movieCall = await getData<MoviesList>(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=fr-EU&with_genres=${id}`
    );
    setSearchField(movieCall.results);
  };

  ///////////////////////get movies

  // useEffect(() => {
  //   setMovies(moviesLists);
  // }, []);

  //////////////////geting movie data
  useEffect(() => {
    const getMovie = async () => {
      const data = await getMovieById("550");
      setMovie(data);
    };
    getMovie();
  }, []);

  //////////////////geting movie data
  useEffect(() => {
    const getCategory = async () => {
      const data = await getCategories();
      setCategoryList(data);
    };
    getCategory();
  }, []);
  ///////////////////////////////searching
  useEffect(() => {
    const searchFiltering = () => {
      const filtered = moviesArraysList.filter((movie) => {
        return movie.title?.toLowerCase().includes(searchInput);
      });
      setSearchField(filtered);
    };
    searchFiltering();
  }, [moviesArraysList, searchInput]);

  const toggleRadio = (event: React.MouseEvent<HTMLElement>) => {
    const radio = event.target as HTMLInputElement;
    getMoviesByCategory(+radio.id);
  };

  const searchForMovie = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value.toLocaleLowerCase());
  };

  return (
    <div className="main">
      <Header />
      <div id="container">
        <Filters
          categoryList={categoryList}
          radioClick={toggleRadio}
          searchMovie={searchForMovie}
        />
        <CardsList moviesList={searchField} />
        {/* <div>
        <Details movie={movie} />
      </div> */}
      </div>
      //{" "}
    </div>
  );
};

export default App;
