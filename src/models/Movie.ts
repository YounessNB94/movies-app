export interface Movie {
  id?: string;
  title?: string;
  category?: string;
  release_date?: string;
  overview?: string;
  genres?: [
    {
      id: string;
      name: string;
    }
  ];
  poster_path?: string;
  name?: string;
  backdrop_path?: string;
}
