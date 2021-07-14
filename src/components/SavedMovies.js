import React, {useContext, useEffect, useState } from 'react'
import Footer from "./Footer"
import Navbar from './Navbar'
import logo from "../images/netflix-logo.png"
import { Link } from 'react-router-dom'
import "../css/SavedMovies.css"
import { firestore } from '../firebase/firebase'
import { AuthContext } from "../context/AuthContext"
import LoaderTwo from './LoaderTwo'
import StarManage from "./StarManage"
import LoadingCards from './LoadingCards'

function SavedMovies() {
    const { currentUser } = useContext(AuthContext)
    const [movies, setMovies] = useState(null)
    const [loading, setLoading] = useState(false)
    const [delteLoad, setDeleteLoad] = useState({id: "", message: ""})
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const db = await firestore.collection("users").doc(currentUser.uid).get()
                const data = db.data().savedMovies
                setMovies(data)
            } catch (e) {
                console.log(e.message)
            }
            setLoading(false)
        }
        return fetchData()
    }, [])

    const handleDeleteMovie = async (movie) => {
        try {
            setDeleteLoad({id: movie.id, message: "Deleting please wait..."})
            const db = await firestore.collection("users").doc(currentUser.uid).get()
            const data = db.data().savedMovies
            const newData = await data.filter(m => movie.id !== m.id)
            await firestore.collection("users").doc(currentUser.uid).update({ savedMovies: newData })
            setMovies(newData)
        } catch (e) {
            console.log(e)
        }
        setDeleteLoad({ id: "", message: "" })
    }
    return (
        <div className="saved-container">
            <Navbar />
            <div className="saved-content">
                <nav className="movie-nav">
                    <Link to="/home"><img id="movie-logo" src={logo} /></Link>
                </nav>
                <h1 className="save-text">Your Saved Movies <i className="fas fa-folder-open"></i></h1>
                <div className="saved-movies">
                    {loading && <LoadingCards />}
                    {!loading && movies === null && <div className="empty-info"><span id="comment-error">Check Your Internet Connection</span></div>}
                    {!loading && movies && movies.length === 0 && <div className="empty-info"><h7>Your Playlist is empty <Link id="empty-info-link" to="/home/films">Add Movies!</Link></h7></div>}
                    {!loading && movies && movies.map(m =>
                        <div className="saved-card">
                            <img src={m.cover} />
                            <div className="saved-card-info">
                                <div>
                                    <h6>{m.title}</h6>
                                    <StarManage stars={m.stars / m.comments.length} reviews={m.comments.length} reviewShow={true} />
                                    <div className="duration">Duration: {m.duration}</div>
                                    <div className="duration">Genre: | {m.genre.map(g => <span>{g} | </span>)}</div>
                                    <div className="duration">Directors: {m.directors}</div>
                                    <p>{m.bio}</p>
                                </div>
                                <div className="movies-btns">
                                    <button onClick={() => handleDeleteMovie(m)}>{m.id === delteLoad.id ? delteLoad.message : "Delete From List"}</button>
                                    <Link className="saved-movie-link" to={`/home/films/${m.title}`}>Watch Now!</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SavedMovies
