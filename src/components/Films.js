import React, { useEffect, useRef, useState, useContext } from 'react'
import '../css/Films.css'
import { Link } from 'react-router-dom'
import logo from '../images/netflix-logo.png'
import Navbar from './Navbar'
import Footer from "./Footer"
import LoadingCards from "./LoadingCards"
import StarManage from "./StarManage"
import { firestore } from '../firebase/firebase'
import { AuthContext } from "../context/AuthContext"

function Films() {
    const [inputVal, setInputVal] = useState('')
    const [data, setData] = useState([])
    const [filterGenre, setFilterGenre] = useState('All')
    const [addToWatchLoad, setAddToWatchLoad] = useState({id: "", message: ""})
    const { currentUser } = useContext(AuthContext)
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

    const handleWatchLater = async (movie) => {
        setAddToWatchLoad({ id: movie.id, message: 'Adding please wait...' })
        const db = await firestore.collection("users").doc(currentUser.uid).get()
        const movieData = db.data().savedMovies
        const checkIfitsIn = await movieData.filter(m => m.id === movie.id)
        console.log(checkIfitsIn)
        if (checkIfitsIn.length !== 0) {
            return setAddToWatchLoad({ id: movie.id, message: "It's Already in There" })
            
        } else {
            await firestore.collection("users").doc(currentUser.uid).update({ savedMovies: [...movieData, movie] })
        }
        setAddToWatchLoad({ id: movie.id, message: "Added to Watch Later" })
    }

    const loadMovies = (inputVal) => {
        if (inputVal) {
            const sdata = data.filter(m => m.title.includes(inputVal.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1, 1000)).join(" ")))
            if (sdata[0]) {
                return sdata.map(m => (
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
                                <button className={addToWatchLoad.id === m.id && "disable-button"} onClick={() => handleWatchLater(m)}>{addToWatchLoad.id === m.id ? addToWatchLoad.message : "Add to Watch Later"}</button>
                                <Link className="saved-movie-link" to={`/home/films/${m.title}`}>Watch Now!</Link>
                            </div>
                        </div>
                    </div>
                ))
            } else {
                return <div className="empty-info"><h6 id="not-found">No films were found. Please try again <i className="fas fa-heart-broken"></i></h6></div>
            }
        }
        if (filterGenre === 'All') {
            return data.map(m => (
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
                            <button className={addToWatchLoad.id === m.id && "disable-button"} onClick={() => handleWatchLater(m)}>{addToWatchLoad.id === m.id ? addToWatchLoad.message : "Add to Watch Later"}</button>
                            <Link className="saved-movie-link" to={`/home/films/${m.title}`}>Watch Now!</Link>
                        </div>
                    </div>
                </div>
            ))
        } else {
            const genres = data.filter(m => m.genre.includes(filterGenre))
            return genres.map(m => (
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
                            <button className={addToWatchLoad.id === m.id && "disable-button"} onClick={() => handleWatchLater(m)}>{addToWatchLoad.id === m.id ? addToWatchLoad.message : "Add to Watch Later"}</button>
                            <Link className="saved-movie-link" to={`/home/films/${m.title}`}>Watch Now!</Link>
                        </div>
                    </div>
                </div>
            ))
        }
    }


    const handleInputVal = (e) => {
        setInputVal(e.target.value)
    }
    return (
        <main className="films-main">
            <Navbar />
            <div className="films-conatainer">
                <div className="films-main-search">
                    <Link to="/home"><img src={logo} /></Link>
                    <div className="search-block">
                        <input onKeyUp={handleInputVal} type="text" placeholder="Search movie" />
                        <i className="fas fa-search"></i>
                    </div>
                    <div className="choose-genre">
                        <h1 className="film-text">Watch Netflix Orginals <i className="fas fa-film"></i></h1>
                        <div className="genres">
                            <div onClick={() => setFilterGenre('All')} className={`choose-option ${filterGenre === 'All' && "active-genre"}`}>All</div>
                            <div onClick={() => setFilterGenre('Horror')} className={`choose-option ${filterGenre === 'Horror' && "active-genre"}`}>Horror</div>
                            <div onClick={() => setFilterGenre('Thriller')} className={`choose-option ${filterGenre === 'Thriller' && "active-genre"}`}>Thriller</div>
                            <div onClick={() => setFilterGenre('Drama')} className={`choose-option ${filterGenre === 'Drama' && "active-genre"}`}>Drama</div>
                            <div onClick={() => setFilterGenre('Crime')} className={`choose-option ${filterGenre === 'Crime' && "active-genre"}`}>Crime</div>
                            <div onClick={() => setFilterGenre("Fantasy")} className={`choose-option ${filterGenre === "Fantasy" && "active-genre"}`}>Fantasy</div>
                            <div onClick={() => setFilterGenre('Romance')} className={`choose-option ${filterGenre === 'Romance' && "active-genre"}`}>Romance</div>
                            <div onClick={() => setFilterGenre('Adventure')} className={`choose-option ${filterGenre === 'Adventure' && "active-genre"}`}>Adventure</div>
                        </div>
                    </div>
                </div>
                <div className="movies-list">
                    {loading ? <LoadingCards /> : data.length === 0 ? <div className="empty-info"><span id="comment-error">Check Your Internet Connection</span></div>
                        : loadMovies(inputVal)}
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Films
