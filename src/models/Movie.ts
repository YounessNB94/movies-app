import { Category } from "./category";
// Why are all the properties optional ? 
// Most of them should absolutely be present in the data you receive from the API
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
