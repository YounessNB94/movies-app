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
import "./Homepage.css";
export const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  // Nono, you can initiliazed with an empty array
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([
    {
      id: "",
      title: "",
      name: "",
      poster_path: "",
    },
  ]);
  // Why do you maintain two list of movies ? One is enough and you update it depending on the api call triggered 
  const [displayMovies, setDisplayMovies] = useState(trendingMovies);
  const [pageNumber, setPageNumber] = useState(1);
  // I don't think you need this many state variables.
  // Conditioning with searchEvent and CatId is largely enough
  const [isCategory, setIsCategory] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  // prettier-ignore
  const [searchEvent, setSearchEvent] = useState<React.ChangeEvent<HTMLInputElement>>();
  // Why using the location ? the "Link" from react-router-dom does that for you
  const location = useLocation();
  const detailCategoryId = location?.state?.id?.toString();

  //in the detail page when clicking on a genre, we'll take that id
  //and display the movie list of that genre in the homepage 
  const [catId, setCatId] = useState(detailCategoryId);
  // Same here, an empty array is enough
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
    //only when page changes and when we don't have any search or a clicked category(from the homepage or the detail page)
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
  // You could put this call api in the concerned component (Filters.tsx)
  useEffect(() => {
    const categoryList = async () => {
      const data = await getCategories();
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
    if (catId && searchInput.length === 0) {
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
    setPageNumber(1);
    
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
