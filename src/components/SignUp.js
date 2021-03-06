import React, { useState, useContext, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../images/netflix-logo.png'
import "../css/LoginSignup.css"
import Footer from './Footer'
import { AuthContext } from '../context/AuthContext'

function Login() {
    const { signInWithPopup, signUpWithEmailAndPassword, emailVal, setEmailVal } = useContext(AuthContext)
    const [togglePassword, setTogglePassword] = useState(true)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const nameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const handleMailInput = (e) => {
        setEmailVal(e.target.value)
    }
    const handleGoogleSign = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError('')
            await signInWithPopup()
            history.push('/home/profile')
        } catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (!emailVal || !passwordRef.current.value) {
            return setError("Please Fill Inputs")
        }
        try {
            setError('')
            setLoading(true)
            await signUpWithEmailAndPassword(emailVal, passwordRef.current.value, nameRef.current.value)
            setTimeout(() => {
                history.push('/home/profile')
            }, 500)
        } catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }
    return (
        <div className='login-container'>
            <div className="login-content">
                <Link to='/home'><img id="login-logo" src={logo} alt='bg' /></Link>
                <div className="login-hero">
                    <form onSubmit={handleSignUp} className="login-form">
                        <h2>Sign Up</h2>
                        <input ref={nameRef} required placeholder="Your Name" />
                        <input onChange={handleMailInput} value={emailVal} required placeholder="Your Email Address" />
                        <div className='pass-div'>
                            <input ref={passwordRef} required placeholder="Create Password" type={togglePassword ? "password" : "text"} />
                            {togglePassword ? <i onClick={() => setTogglePassword(!togglePassword)} className="fas fa-eye-slash"></i> : <i onClick={() => setTogglePassword(!togglePassword)} className="fas fa-eye"></i>}
                        </div>
                        <div className='pass-div'>
                            <input ref={passwordConfirmRef} required placeholder="Confirm Password" type={togglePassword ? "password" : "text"} />
                            {togglePassword ? <i onClick={() => setTogglePassword(!togglePassword)} className="fas fa-eye-slash"></i> : <i onClick={() => setTogglePassword(!togglePassword)} className="fas fa-eye"></i>}
                        </div>
                        <button onClick={handleSignUp} disabled={loading}>Sign Up</button>
                        <div className="signup-page">
                            <h3 >Already Have an Account ? <Link className="signup-page-link" to="login">Sign In</Link></h3>
                        </div>
                        <div style={{ width: "300px", wordWrap: "break-word" }}>
                            <h6>{error}</h6>
                        </div>
                    </form>
                    <button disabled={loading} className='' onClick={handleGoogleSign}><i className="fab fa-google"></i> Sign Up with Google</button>
                </div>
            </div>
            <Footer borderTop={"none"} bg={'#000000bb'} />
        </div>
    )
}

export default Login
