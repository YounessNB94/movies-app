// getAll
// getById
// getBySearch

import axios from "axios";
import { Movie } from "../models/Movie";
import { getData } from "./data";
import { Categories } from "../models/Categories";
const API_KEY = import.meta.env.VITE_API_KEY;

export const getMovieById = async (id: string) => {
  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  return await getData<Movie>(movieUrl);
};

export const getMovieByCategoryId = async (id: string) => {
  const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key==${API_KEY}&language=fr-EU&with_genres=${id}`;
  return await getData<Movie>(movieUrl);
};

export const getCategories = async () => {
  const movieUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
  return await getData<Categories>(movieUrl);
};
