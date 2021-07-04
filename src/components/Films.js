import React, { useEffect, useRef, useState } from 'react'
import '../css/Films.css'
import { Link } from 'react-router-dom'
import logo from '../images/netflix-logo.png'
import { firestore } from '../firebase/firebase'
import Navbar from './Navbar'
import Footer from "./Footer"
import LoadingCards from "./LoadingCards"
import StarManage from "./StarManage"

function Films() {
    const [data, setData] = useState([])
    const [loading, setLoaing] = useState(false)
    const [inputVal, setInputVal] = useState('')
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

    const loadMovies = (inputVal) => {
        if (inputVal) {
            const sdata = data.filter(m => m.title.includes(inputVal.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1, 1000)).join(" ")))
            if (sdata[0]) {
                return sdata.map(m => (
                    <div className="movie-card">
                        <img className="movie-card-img" src={m.cover} />
                        <span className="movie-card-title">{m.title}</span>
                        <StarManage stars={m.stars} />
                    </div>
                ))
            } else {
                return <h6 id="not-found">No films were found. Please try again <i className="fas fa-heart-broken"></i></h6>
            }
        }
        return data.map(m => (
            <div className="movie-card">
                <img className="movie-card-img" src={m.cover} />
                <span className="movie-card-title">{m.title}</span>
                <StarManage stars={m.stars} />
                <div className="genre">{m.genre.map(g => <span>{g} </span>)}</div>
            </div>
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
