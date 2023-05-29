import React, { useEffect, useState } from "react";

import "./App.css";
import { Header } from "./shared/Header";
import { Filters } from "./pages/homepage/components/Filters";
import { CardsList } from "./pages/homepage/components/CardsList";
import { getData } from "./api/data";
import { Categories } from "./models/Category";
import { MoviesList } from "./models/MoviesList";

export type movieType = {
  backdrop_path: string;
  id: number;
  title: string;
};

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [categoryList, setCategoryList] = useState<Categories | null>(null);
  const [moviesArraysList, setMoviesArraysList] = useState<movieType[]>([
    { backdrop_path: "", id: 0, title: "" },
  ]);

  const [searchField, setSearchField] = useState(moviesArraysList);

  const getCategories = async () => {
    // const categoryCall = await getData<Categories>(
    //   `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    // );
    // setCategoryList(categoryCall);
  };

  const getMovies = async () => {
    console.log(import.meta.env.VITE_API_KEY);
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
    // const movieCall = await getData<MoviesList>(
    //   `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=fr-EU&with_genres=${id}`
    // );
    // setSearchField(movieCall.results);
  };

  ///////////////////////get movies

  // useEffect(() => {
  //   setMovies(moviesLists);
  // }, []);

  ////////////////////get category
  useEffect(() => {
    getCategories();
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
      </div>
    </div>
  );
};

export default App;
