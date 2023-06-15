import { Category } from "../models/category";
import { getData } from "./data";

const API_KEY = import.meta.env.VITE_API_KEY;

export const getCategories = async () => {
  const movieUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&include_adult=false`;
  return await getData<{ genres: Category[] }>(movieUrl);
};
