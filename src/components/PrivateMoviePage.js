import React, {useContext, createContext, useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase'
import { Redirect, Route } from 'react-router';
import MoviePage from "./MoviePage";
import { AuthContext } from '../context/AuthContext';

function PrivateMoviePage() {
    const [data, setData] = useState([])
    const [loading, setLoaing] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoaing(true)
                const db = await firestore.collection('data').get()
                setData(db.docs.map(doc => doc.data()))
            } catch (e) {
                console.log(e)
            }
            setLoaing(false)
        }
        return fetchData()
    }, [])
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
