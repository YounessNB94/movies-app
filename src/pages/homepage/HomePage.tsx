import React, { useEffect, useState } from "react";
import { Category } from "../../models/category";
import { Movie } from "../../models/movie";
import { Header } from "../../shared/Header";
import { Filters } from "./components/Filters";
import { CardsList } from "./components/CardsList";
import {
  getTrendMovies,
  getMoviesByCategory,
  getMoviesBySearch,
} from "../../api/movieApiCalls";
import "./HomePage.css";
import { getCategories } from "../../api/categoryApiCalls";
import { log } from "console";

export const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [moviesArraysList, setMoviesArraysList] = useState<Movie[]>([
    {
      id: "",
      title: "",
      name: "",
      poster_path: "",
    },
  ]);
  const [searchField, setSearchField] = useState(moviesArraysList);
  const [pageNumber, setPageNumber] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [searchId, setSearchId] = useState(1);
  const [catId, setCatId] = useState("");
  const [searchEvent, setSearchEvent] = useState<
    React.ChangeEvent<HTMLInputElement>
  >();
  //////////////////display trending movies//////////////////////////
  useEffect(() => {
    if (searchId || categoryId) {
      setSearchId(1);
      setCategoryId(1);
      const getMovies = async () => {
        const data = await getTrendMovies(pageNumber);
        setMoviesArraysList(data.results);
        setSearchField(data.results);
      };
      getMovies();
    }
  }, [pageNumber]);

  //////////////////display categories//////////////////////////
  useEffect(() => {
    const categoryList = async () => {
      const data = await getCategories();
      setCategoryList(data.genres);
      setCategoryList(data.genres);
    };
    categoryList();
  }, []);

  ///////////////////////////////searching
  useEffect(() => {
    if (searchInput) {
      setSearchId(1);
      setCategoryId(1);
      const searchFiltering = async () => {
        const data = await getMoviesBySearch(searchInput, pageNumber);
        setSearchField(
          data.results.length > 0 ? data.results : moviesArraysList
        );
      };
      searchFiltering();
    }
  }, [moviesArraysList, searchInput, pageNumber]);
  ///////////i don't get the first dependency

  //////////////////////////////////////////////
  const displayMoviesByCategory = (event: React.MouseEvent<HTMLElement>) => {
    setSearchId(0);
    setCategoryId(0);
    setPageNumber(1);
    setSearchInput("");
    if(searchEvent ){
searchEvent.target.value = "";
    }
    const radio = event.target as HTMLInputElement;
    const id = radio.id;
    setCatId(id);
  };

  useEffect(() => {
    if (catId) {
      const moviesByCategory = async () => {
        const data = await getMoviesByCategory(catId, pageNumber);
        setSearchField(data.results);

        /////////////////////// not sure how it worked
      };
      moviesByCategory();
    }
  }, [pageNumber, catId]);

  ///////////////////////////////////////////////////////////////
  const searchForMovie = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value.toLocaleLowerCase());
    setSearchEvent(event);
  };

  const handleClickNext = () => {
    setPageNumber(pageNumber + 1);
  };
  const handleClickPrev = () => {
    setPageNumber(pageNumber - 1);
  };
  return (
    <div>
      <Header />
      <div className="main">
        <div id="container">
          <Filters
            categoryList={categoryList}
            radioClick={displayMoviesByCategory}
            searchMovie={searchForMovie}
          />
        </div>
        <CardsList
          moviesList={searchField}
          pageNumber={pageNumber}
          nextClick={handleClickNext}
          prevClick={handleClickPrev}
        />
      </div>
    </div>
  );
};
