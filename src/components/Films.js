import React, { useEffect, useRef, useState, useContext } from 'react'
import '../css/Films.css'
import { Link } from 'react-router-dom'
import logo from '../images/netflix-logo.png'
import Navbar from './Navbar'
import Footer from "./Footer"
import LoadingCards from "./LoadingCards"
import StarManage from "./StarManage"
import { MoviesContext } from '../context/MoviesContext'

function Films() {
    const { data, loading } = useContext(MoviesContext)
    const [inputVal, setInputVal] = useState('')
    const loadMovies = (inputVal) => {
        if (inputVal) {
            const sdata = data.filter(m => m.title.includes(inputVal.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1, 1000)).join(" ")))
            if (sdata[0]) {
                return sdata.map(m => (
                    <Link style={{ textDecoration: "none", color: "white" }} to={`/home/films/${m.title}`}>
                        <div className="movie-card">
                            <img className="movie-card-img" src={m.cover} />
                            <span className="movie-card-title">{m.title}</span>
                            <StarManage stars={m.stars} />
                        </div>
                    </Link>
                ))
            } else {
                return <h6 id="not-found">No films were found. Please try again <i className="fas fa-heart-broken"></i></h6>
            }
        }
        return data.map(m => (
            <Link style={{ textDecoration: "none", color: "white" }} to={`/home/films/${m.title}`}>
                <div className="movie-card">
                    <img className="movie-card-img" src={m.cover} />
                    <span className="movie-card-title">{m.title}</span>
                    <StarManage stars={m.stars} />
                    <div className="genre">{m.genre.map(g => <span>{g} </span>)}</div>
                </div>
            </Link>
        ))
    }


    const handleInputVal = (e) => {
        setInputVal(e.target.value)
    }
    return (
        <main className="films-main">
            <Navbar />
            <div className="films-conatainer">
                <div className="films-main-search">
                    <img src={logo} />
                    <div className="search-block">
                        <input onKeyUp={handleInputVal} type="text" placeholder="Search movie" />
                        <i className="fas fa-search"></i>
                    </div>
                    <div className="choose-genre">
                        <div className="choose-option">all</div>
                    </div>
                </div>
                <div className="movies-list">
                    {loading ? <LoadingCards /> : loadMovies(inputVal)}
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Films
