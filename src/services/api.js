const API_KEY = "d164f46c";
const BASE_URL = "https://www.omdbapi.com/";  // base without query params

export const searchMovie = async (query) => {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`;
  const response = await fetch(url);
  const data = await response.json();
  // OMDb search results are in data.Search
  return data.Search || [];   // may need to check for undefined / error
};

export const getMovieById = async (imdbID) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
  const data = await response.json();
  return data;
};
