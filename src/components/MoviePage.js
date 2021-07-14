import React, { useEffect, useContext, useRef, useState } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import logo from "../images/netflix-logo.png"
import "../css/MoviePage.css"
import Footer from "./Footer"
import StarManage from "./StarManage"
import LoadingCards from "./LoadingCards"
import LoaderTwo from "./LoaderTwo"
import { firestore } from '../firebase/firebase'
import { AuthContext } from "../context/AuthContext"
import uuid from "uuid/dist/v4"


function MoviePage({ props }) {
    const { currentUser } = useContext(AuthContext)
    const [comments, setComments] = useState()
    const [loading, setLoading] = useState(false)
    const [addToWatchLoad, setAddToWatchLoad] = useState({ id: "", message: "" })
    const [deleteLoad, setDeleteLoad] = useState(false)
    const [inputToggle, setInputToggle] = useState({id: "", isToggle: false})
    const [error, setError] = useState('')
    const [textInputRef, setTextInputRef] = useState({ star: 0, id: uuid(), email: currentUser.email, comment: '', time: new Date().toLocaleString() })
    useEffect(() => {
        const fetchData = async () => {
            const db = await firestore.collection('data').doc(props.id).get()
            const data = db.data()
            data && setComments(data.comments.map(c => c))
        }
        return fetchData()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!textInputRef.comment) {
            return setError("Please write your comment")
        } else if (textInputRef.star === 0) {
            return setError("Please rate movie")
        }
        try {
            setLoading(true)
            setError("")
            const db = await firestore.collection("data").doc(props.id).get()
            const data = db.data()
            await firestore.collection("data").doc(data.id).update({ comments: [...data.comments, textInputRef] })
            await firestore.collection("data").doc(data.id).update({ stars: data.stars + textInputRef.star })
            setComments([...comments, textInputRef])
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
        setTextInputRef({ ...textInputRef, id: uuid(), comment: "", star: 0 })
        setLoading(false)
    }

    const deleteComment = async (id) => {
        setDeleteLoad(true)
        const db = await firestore.collection('data').doc(props.id).get()
        const data = db.data()
        const deletingData = data.comments.filter(c => c.id === id)
        await firestore.collection('data').doc(data.id).update({ stars: data.stars - deletingData[0].star })
        const newData = data.comments.filter(c => c.id !== id)
        firestore.collection('data').doc(data.id).update({ comments: newData })
        setComments(newData)
        setDeleteLoad(false)
    }

    const handleChangeInput = async (e, id) => {
        if (!e.target.value) {
            setComments(comments)
        }
        const coms = comments.map(c => {
            if (c.id === id) {
                c.comment = e.target.value
            }
            return c
        })
        setComments(coms)
        firestore.collection("data").doc(props.id).update({ comments: coms })
    }

    const handleInputToggle = (id) => {
        setInputToggle(st => { return { id, isToggle: !st.isToggle } })
        console.log(inputToggle)
    }

    const handleWatchLater = async (movie) => {
        setAddToWatchLoad({ id: movie.id, message: ' Adding please wait...' })
        const db = await firestore.collection("users").doc(currentUser.uid).get()
        const movieData = db.data().savedMovies
        const checkIfitsIn = await movieData.filter(m => m.id === movie.id)
        console.log(checkIfitsIn)
        if (checkIfitsIn.length !== 0) {
            return setAddToWatchLoad({ id: movie.id, message: " It's Already in There" })

        } else {
            await firestore.collection("users").doc(currentUser.uid).update({ savedMovies: [...movieData, movie] })
        }
        setAddToWatchLoad({ id: movie.id, message: "Added to Watch Later" })
    }

    return (
        <>
            <Navbar />
            <div className="movie-conteiner">
                <nav className="movie-nav">
                    <Link to="/home"><img id="movie-logo" src={logo} /></Link>
                </nav>            
                {!props ?
                    <LoadingCards /> :
                    <div className="movie-content">
                        <div className="movie-content-info">
                            <h2>Film {props.title}</h2>
                            <div className="movie-genre">
                                {props.genre.map(g => <span>{g} </span>)}
                            </div>
                            <button onClick={() => handleWatchLater(props)} id="add-to-later"><i className="fas fa-folder-open"></i>    {addToWatchLoad.id === props.id ? addToWatchLoad.message : " Add to Watch Later "}</button>
                            <p>{props.bio}</p>
                            <video controls width={'100%'} src={props.trailer}></video>
                            <form onSubmit={handleSubmit} className="comment-form">
                                <textarea value={textInputRef.comment} onChange={(e) => setTextInputRef({ ...textInputRef, comment: e.target.value })} placeholder="Add your comment"></textarea>
                                <div className="btn-div">
                                    <div>
                                        <p>Rate this movie for others</p>
                                        <fieldset class="rating">
                                            <input type="radio" id="star5" name="rating" value="5" />
                                            <label onClick={() => setTextInputRef({ ...textInputRef, star: 5 })} for="star5" title="Love this film!"></label>

                                            <input type="radio" id="star4" name="rating" value="4" />
                                            <label onClick={() => setTextInputRef({ ...textInputRef, star: 4 })} for="star4" title="Nice Movie"></label>

                                            <input type="radio" id="star3" name="rating" value="3" />
                                            <label onClick={() => setTextInputRef({ ...textInputRef, star: 3 })} for="star3" title="Not Bad"></label>

                                            <input type="radio" id="star2" name="rating" value="2" />
                                            <label onClick={() => setTextInputRef({ ...textInputRef, star: 2 })} for="star2" title="Not Good"></label>

                                            <input type="radio" id="star1" name="rating" value="1" />
                                            <label onClick={() => setTextInputRef({ ...textInputRef, star: 1 })} for="star1" title="100% Bad"></label>

                                        </fieldset>
                                    </div>
                                    {loading ? <LoaderTwo width={"70px"} height={"60px"}/> : <button disabled={loading} onClick={handleSubmit}>Add comment</button>}
                                </div>
                                <span id="comment-error">{error}</span>
                            </form>
                            {!comments ? <LoaderTwo /> : comments.length === 0 ? <h5>No comments yet. Be first!</h5> :
                                <div className="comments-section">
                                    <h2 className='comments-h2'>Comments</h2>
                                    {comments.map(c => (
                                        <div key={c.id} className="comment">
                                            <div>
                                                <h6>{c.time}</h6>
                                                <h3>{c.email}</h3>
                                                <StarManage marginTop={"5px"} reviewShow={false} stars={c.star} />
                                                {inputToggle && inputToggle.id === c.id ? <form onSubmit={() => setInputToggle({ id: "", isToggle: false })} ><input required onChange={(e) => handleChangeInput(e, c.id)} value={c.comment} /></form> : <p>{c.comment}</p>}
                                            </div>
                                            <div>
                                                {currentUser.email === c.email && <button className="delete-comment" onClick={() => setInputToggle({id: c.id}) || deleteComment(c.id)}>{deleteLoad && c.id === inputToggle.id? "Deleting..." : "Delete"}</button>}
                                                {currentUser.email === c.email && <button className="edit-comment" onClick={() => c.id === inputToggle.id ? handleInputToggle({ id: "", isToggle: false }) : handleInputToggle(c.id)}>{inputToggle && inputToggle.id === c.id ? "Done" : "Edit"}</button>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                }
                <Footer />
            </div>
        </>
    )
}

export default MoviePage
