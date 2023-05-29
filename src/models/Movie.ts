export interface Movie {
  id: string;
  title: string;
  category?: string;
  release_date?: string;
  overview?: string;
  genres?: [
    {
      name: string;
    }
  ];
}
