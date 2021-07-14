import React, {useContext, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import "../css/ForgotPassword.css"
import logo from "../images/netflix-logo.png"
import { AuthContext } from '../context/AuthContext'

function ForgotPassword() {
    const emailRef = useRef()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const { passwordReset } = useContext(AuthContext)
    const handlePasswordReset = async (e) => {
        e.preventDefault()
        try {
            setError('')
            setMessage('')
            setLoading(true)
            console.log(emailRef.current.value)
            await passwordReset(emailRef.current.value)
            setMessage("Check your inbox for further instructors")
        } catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }
    return (
        <div className="f-container">
            <nav className="movie-nav">
                <Link to="/home"><img id="movie-logo" src={logo} /></Link>
            </nav>
            <div className="f-content">
                <i className="fab fa-expeditedssl"></i>
                <h2>Forgot Password</h2>
                <span className="f-content-hint">* Enter your email address associated with your account and we'll send you a link to reset your password.</span>
                <form onSubmit={(e) => handlePasswordReset(e)}>
                    <input ref={emailRef} />
                    <button onClick={(e) => handlePasswordReset(e)} >Send Email</button>
                </form>
                <span id='f-error'>{error}</span>
                <span id='f-success'>{message}</span>
                <Link className="f-link" to="/home"><i className="fas fa-arrow-left"></i> Home Page</Link>
            </div>
        </div>
    )
}

export default ForgotPassword
