import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovie, getMovieById } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        // Step 1: Search for a group of movies
        const searchResults = await searchMovie("Avengers"); // default query

        // Step 2: Get full details for each
        const detailedMovies = await Promise.all(
          searchResults.map(async (movie) => {
            const fullDetails = await getMovieById(movie.imdbID);
            return fullDetails;
          })
        );

        setMovies(detailedMovies);
      } catch (error) {
        console.error(error);
        setError("Failed to load Movies")
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchQuery.trim())return
    if (loading) return

    setLoading(true)
    try{
      const searchResults = await searchMovie(searchQuery)
      setMovies(searchResults)
      setError(null)//clearing the previous error detail
    }catch(err){
      console.log(err)
      setError("Failed to search movies...")
    }finally{
      setLoading(false)
    }

    //setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies...."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

        {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading..</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            // movie.title.toLowerCase().startsWith(searchQuery) &&
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
