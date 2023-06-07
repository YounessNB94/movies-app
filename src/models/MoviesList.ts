import { Movie } from "./Movie";
// No, if you need an interface for the response you receive from the API it should be in the api folder
// Here in the models forlder we just want to see the "business objects", meaning the category and movie
export interface MoviesList {
  results: Movie[];
}
