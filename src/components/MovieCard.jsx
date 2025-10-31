import '../css/MovieCard.css'
import { useMovieContext } from '../context/MovieContext';

function MovieCard({movie}) {

    const {isFavourite, addToFavourites, removeFromFavourites} = useMovieContext() 
    const favourite = isFavourite(movie.id)

    function onFavoriteClick(e){
        e.preventDefault()
        if(favourite) 
            {removeFromFavourites(movie.id)
              
            }
            else 
                {addToFavourites(movie)
                     alert("Now is in your Favourite")
                }
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={movie.Poster} alt={movie.Title}/>
                <div className="movie-overlay">
                    <button className={`favourite-btn ${favourite?"active": ""}`} onClick={onFavoriteClick}>
                        🤍
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Released?.split(" ")[2]}</p>
            </div>

        </div>
    );
}

export default MovieCard
