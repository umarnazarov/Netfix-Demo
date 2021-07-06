import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router';
import MoviePage from "./MoviePage";
import { MoviesContext } from '../context/MoviesContext'
import { AuthContext } from '../context/AuthContext';

function PrivateMoviePage() {
    const { data } = useContext(MoviesContext)
    const { currentUser } = useContext(AuthContext)
    const renderMoviePage = (routeProps) => {
        let movie = data.length !== 0 && data.find(m => m.title.toLowerCase() === routeProps.match.params.title.toLowerCase())
        return <MoviePage key={movie.title} props={movie} />
    }

    return (
        <Route exact path={`/home/films/:title`} render={routeProps => currentUser ? renderMoviePage(routeProps) : <Redirect to="/login" />} />
    )
}

export default PrivateMoviePage
