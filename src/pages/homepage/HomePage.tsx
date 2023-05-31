import React, { useEffect, useState } from "react";
import { Category } from "../../models/Category";
import { Movie } from "../../models/Movie";
import { Header } from "../../shared/Header";
import { Filters } from "./components/Filters";
import { CardsList } from "./components/CardsList";
import {
  getTrendMovies,
  getCategories,
  getMoviesByCategory,
  getMoviesBySearch,
} from "../../api/MovieApiCalls";
import "./HomePage.css";

export const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [categoryList, setCategoryList] = useState<Category [] | null>(
    null
  );
  const [moviesArraysList, setMoviesArraysList] = useState<Movie[]>([
    {
      id: "",
      title: "",
      name: "",
      poster_path: "",
    },
  ]);

  const [searchField, setSearchField] = useState(moviesArraysList);

  //////////////////display trending movies//////////////////////////
  useEffect(() => {
    const getMovies = async () => {
      const data = await getTrendMovies();
      setMoviesArraysList(data.results);
      setSearchField(data.results);
    };
    getMovies();
  }, []);

  //////////////////display categories//////////////////////////
  useEffect(() => {
    const categoryList = async () => {
      const data = await getCategories();
      setCategoryList(data.genres);
    };
    categoryList();
  }, []);

  ///////////////////////////////searching
  useEffect(() => {
    const searchFiltering = async () => {
      const data = await getMoviesBySearch(searchInput);
      setSearchField(data.results.length > 0 ? data.results : moviesArraysList);
    };
    searchFiltering();
  }, [moviesArraysList, searchInput]);
  ///////////i don't get the first dependency

  //////////////////////////////////////////////
  const displayMoviesByCategory = (event: React.MouseEvent<HTMLElement>) => {
    const radio = event.target as HTMLInputElement;
    const id = radio.id;
    if (id) {
      const moviesByCategory = async () => {
        const data = await getMoviesByCategory(id);
        setSearchField(data.results);
        /////////////////////// not sure how it worked
      };
      moviesByCategory();
    }
  };

  ///////////////////////////////////////////////////////////////
  const searchForMovie = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value.toLocaleLowerCase());
  };

  return (
    <div>
      <div>
        <Header/>
        <div className="main">
          <div id="container">
            <Filters
              categoryList={categoryList}
              radioClick={displayMoviesByCategory}
              searchMovie={searchForMovie}
            />
          </div>
          <CardsList moviesList={searchField} />
        </div>
      </div>
    </div>
  );
};
