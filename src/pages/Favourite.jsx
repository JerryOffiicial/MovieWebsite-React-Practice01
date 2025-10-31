import "../css/Favourites.css";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

function Favourites() {
  const { favourites } = useMovieContext();
  
  if(favourites){
    return(
      <div className="favourites">
        <h2>Your Favourites</h2>
      <div className="movies-grid">
          {favourites.map((movie) => (
            // movie.title.toLowerCase().startsWith(searchQuery) &&
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
        </div>
    );
  }

  return (
    <div className="favourites-empty">
      <h2>No Favourite Movies yet</h2>
      <p>Start addingggggg.........</p>
    </div>
  );
}
export default Favourites;
