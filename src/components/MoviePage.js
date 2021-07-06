import React, { useEffect, useContext, useRef, useState } from 'react'
import Navbar from './Navbar'
import logo from "../images/netflix-logo.png"
import "../css/MoviePage.css"
import Footer from "./Footer"
import LoadingCards from "./LoadingCards"
import { firestore } from '../firebase/firebase'
import { AuthContext } from "../context/AuthContext"
import uuid from "uuid/dist/v4"


function MoviePage({ props }) {
    const { currentUser } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [inputToggle, setInputToggle] = useState(false)
    const [editComment, setEditComment] = useState()
    const [error, setError] = useState('')
    const [textInputRef, setTextInputRef] = useState({ id: uuid(), email: currentUser.email, comment: '', time: new Date().toLocaleString() })
    console.log(comments)
    useEffect(() => {
        const fetchData = async () => {
            const db = await firestore.collection('data').doc(props.id).get()
            const data = db.data()
            setComments(data.comments.map(c => c))
        }
        return fetchData()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!textInputRef.comment) {
            return setError("Please write your comment")
        }
        try {
            setLoading(true)
            setError("")
            setComments([...comments, textInputRef])
            setTextInputRef({ ...textInputRef, id: uuid(), comment: "" })
            const db = await firestore.collection("data").doc(props.id).get()
            const data = db.data()
            console.log(data)
            await firestore.collection("data").doc(data.id).update({ comments: [...data.comments, textInputRef] })
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
        setLoading(false)
    }

    const deleteComment = async (id) => {
        const db = await firestore.collection('data').doc(props.id).get()
        const data = db.data()
        const newData = data.comments.filter(c => c.id !== id)
        firestore.collection('data').doc(data.id).update({ comments: newData })
        setComments(newData)
    }

    const handleChangeInput = async (e, id) => {
        const coms = comments.map(c => c.id === id ? [...comments, { ...c, comment: e.target.value }] : comments)
        console.log(coms)
        setComments(coms)

        // const db = await firestore.collection("data").doc(data.id)
    }

    return (
        <>
            <Navbar />
            <div className="movie-conteiner">
                <nav className="movie-nav">
                    <img id="movie-logo" src={logo} />
                </nav>
                <div className="movie-content">
                    <div className="movie-content-info">
                        <h2>Film {props.title}</h2>
                        <div className="movie-genre">
                            {props.genre.map(g => <span>{g} </span>)}
                        </div>
                        <p>{props.bio}</p>
                        <video controls width={'100%'} src={props.trailer}></video>
                        <h2>Comments</h2>
                        <form onSubmit={handleSubmit} className="comment-form">
                            <textarea value={textInputRef.comment} onChange={(e) => setTextInputRef({ ...textInputRef, comment: e.target.value })} placeholder="Add your comment"></textarea>
                            <span id="comment-error">{error}</span>
                            <div className="btn-div">
                                <button disabled={loading} onClick={handleSubmit}>Add comment</button>
                            </div>
                        </form>
                        {comments.length === 0 ? <h5>No comments yet. Be first!</h5> :
                            <div className="comments-section">
                                {comments.map(c => (
                                    <div className="comment">
                                        <div>
                                            <h3>{c.email}</h3>
                                            <h6>{c.time}</h6>
                                            {inputToggle ? <input onChange={(e) => handleChangeInput(e, c.id)} value={c.comment} /> : <p>{c.comment}</p>}
                                        </div>
                                        <div>
                                            {currentUser.email === c.email && <button className="delete-comment" onClick={() => deleteComment(c.id)}>Delete</button>}
                                            {currentUser.email === c.email && <button className="edit-comment" onClick={() => setInputToggle(!inputToggle)}>Edit</button>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default MoviePage
