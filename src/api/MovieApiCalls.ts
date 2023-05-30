// getAll
// getById
// getBySearch

import { Movie } from "../models/movie";
import { getData } from "./data";
import { MoviesList } from "../models/moviesList";
const API_KEY = import.meta.env.VITE_API_KEY;

export const getTrendMovies = async () => {
  const movieUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=1`;
  return await getData<MoviesList>(movieUrl);
};

export const getMoviesBySearch = async (search: string) => {
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
  return await getData<MoviesList>(movieUrl);
};

export const getMoviesByCategory = async (id: string) => {
  const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr-EU&with_genres=${id}`;
  return await getData<MoviesList>(movieUrl);
};

///////////////////url not working for all movies,,,,,,,,, fix
export const getMovieById = async (id: string) => {
  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  return await getData<Movie>(movieUrl);
};
