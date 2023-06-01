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
} from "../../api/MovieApiCalls";
import "./HomePage.css";
import { getCategories } from "../../api/categoryApiCalls";
import { log } from "console";
import { useLocation } from "react-router-dom";

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
  const [showCat, setShowCat] = useState(true);
  const [showSearch, setShowSearch] = useState(true);

  const [searchEvent, setSearchEvent] =
    useState<React.ChangeEvent<HTMLInputElement>>();

  const location = useLocation();
  const detailCategoryId = location?.state?.id?.toString();

  const [catId, setCatId] = useState(detailCategoryId);

  //////////////////display trending movies//////////////////////////
  useEffect(() => {
    if ((showSearch || showCat) && !(catId?.length > 0)) {
      setShowSearch(true);
      setShowCat(true);
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
      const searchFiltering = async () => {
        const data = await getMoviesBySearch(searchInput, pageNumber);
        setSearchField(data.results);
      };
      searchFiltering();
    } else {
      setSearchField(moviesArraysList);
    }
  }, [searchInput, pageNumber]);

  //////////////////////////////////////////////
  const displayMoviesByCategory = (event: React.MouseEvent<HTMLElement>) => {
    setShowSearch(false);
    setShowCat(false);
    setPageNumber(1);
    setSearchInput("");
    if (searchEvent) {
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
        setShowSearch(false);
        setShowCat(false);
        setSearchInput("");
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
            categoryId={catId}          />
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
