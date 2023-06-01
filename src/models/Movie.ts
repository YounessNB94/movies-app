import { Category } from "./category";

export interface Movie {
  id?: string;
  title?: string;
  category?: string;
  release_date?: string;
  overview?: string;
  genres?: Category[];
  poster_path?: string;
  name?: string;
  backdrop_path?: string;
  
}
