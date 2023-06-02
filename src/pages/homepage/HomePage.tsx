import React, { useEffect, useState } from "react";
import { Category } from "../../models/category";
import { Movie } from "../../models/Movie";
import { Header } from "../../shared/Header";
import { Filters } from "./components/Filters";
import { CardsList } from "./components/CardsList";
import {
  getTrendMovies,
  getMoviesByCategory,
  getMoviesBySearch,
} from "../../api/MovieApiCalls";
import { getCategories } from "../../api/categoryApiCalls";
import { useLocation } from "react-router-dom";

export const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([
    {
      id: "",
      title: "",
      name: "",
      poster_path: "",
    },
  ]);
  const [displayMovies, setDisplayMovies] = useState(trendingMovies);
  const [pageNumber, setPageNumber] = useState(1);
  const [isCategory, setIsCategory] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  // prettier-ignore
  const [searchEvent, setSearchEvent] = useState<React.ChangeEvent<HTMLInputElement>>();
  const location = useLocation();
  const detailCategoryId = location?.state?.id?.toString();

  const [catId, setCatId] = useState(detailCategoryId);
  const [CatMovies, setCatMovies] = useState<Movie[]>([
    {
      id: "",
      title: "",
      name: "",
      poster_path: "",
    },
  ]);

  //////////////////display trending movies//////////////////////////
  useEffect(() => {
    //using this if statement will control the prehavior of displaying the trending movies
    //only when page changes and when we don't have any search or a clicked category
    if (!isSearch && !isCategory && !(catId?.length > 0)) {
      setIsSearch(false);
      setIsCategory(false);
      const getMovies = async () => {
        const data = await getTrendMovies(pageNumber);
        setTrendingMovies(data.results);
        setDisplayMovies(data.results);
      };
      getMovies();
    }
  }, [pageNumber]);

  //////////////////display list of categories//////////////////////////
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
        setDisplayMovies(data.results);
      };
      searchFiltering();
    } else {
      //if there no search input we would like to display the original movie list
      //if category id exists we'll display the category list else the trending
      if (catId) {
        setDisplayMovies(CatMovies);
      } else {
        setDisplayMovies(trendingMovies);
      }
      setIsSearch(false);
      setIsCategory(false);
    }
  }, [searchInput, pageNumber]);

  //////////////////////////////////////////////
  const displayMoviesByCategory = (event: React.MouseEvent<HTMLElement>) => {
    setIsSearch(true);
    setIsCategory(true);
    setPageNumber(1);
    setSearchInput("");
    if (searchEvent) {
      searchEvent.target.value = "";
    }
    const radio = event.target as HTMLInputElement;
    const id = radio.id;
    console.log(id);

    setCatId(id);
  };

  useEffect(() => {
    if (catId) {
      const moviesByCategory = async () => {
        const data = await getMoviesByCategory(catId, pageNumber);
        setDisplayMovies(data.results);
        setCatMovies(data.results);
        setIsSearch(true);
        setIsCategory(true);
        setSearchInput("");
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
            categoryId={catId}
          />
        </div>
        <CardsList
          moviesList={displayMovies}
          pageNumber={pageNumber}
          nextClick={handleClickNext}
          prevClick={handleClickPrev}
        />
      </div>
    </div>
  );
};
