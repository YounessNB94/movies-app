// Nice 
// I would even handle the base url in this file with a const ("https://api.themoviedb.org/3")
// And add it to the url fetched here instead of repeating it in the api files
export const getData = async <T>(url: string): Promise<T> => {
  return fetch(url).then((res) => res.json());
};
