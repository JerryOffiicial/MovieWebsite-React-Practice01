import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children})=> {
    const [favourites, setFavourites] = useState([])

    useEffect(()=>{
        const storedFavs = localStorage.getItem("favourites")//local storage only can store strings, so json convertion is must

        if(storedFavs) setFavourites(JSON.parse(storedFavs))// parse does the normal converstion from the json to normal java code

    },[])

    useEffect(()=>{
        localStorage.setItem('favourites', JSON.stringify(favourites))
    },[favourites])

    const addToFavourites = (movie) =>{
        setFavourites(prev => [...prev, movie])
    }

    const removeFromFavourites =(movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavourite = (movieId) => {
        return favourites.some(movie => movie.id ===movieId)
    }

    const value ={
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite

    }

    return <MovieContext.Provider value ={value}>
        {children}
    </MovieContext.Provider>
}