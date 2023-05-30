import React, { useEffect, useState } from "react";

import "./HomePage.css";
import { Header } from "../../shared/Header";
import { Filters } from "./components/Filters";
import { CardsList } from "./components/CardsList";
import { getData } from "../../api/data";
import { Categories } from "../../models/Categories.ts";
import { MoviesList } from "../../models/MoviesList";
import { Movie } from "../../models/Movie.ts";
import { getMovieById } from "../../api/Movie.ts";
import { Link, Outlet } from "react-router-dom";

export const Homepage = () => {
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

    const getCategories = async () => {
      const categoryCall = await getData<Categories>(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setCategoryList(categoryCall);
    };

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

    ////////////////////get category
    useEffect(() => {
      getCategories();
    }, []);

    //////////////////geting movie data
    useEffect(() => {
      const getMovie = async () => {
        const data = await getMovieById("550");
        setMovie(data);
      };
      getMovie();
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
