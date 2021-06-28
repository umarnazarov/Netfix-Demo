import React, { useState, useContext, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../images/netflix-logo.png'
import "../css/LoginSignup.css"
import Footer from './Footer'
import { AuthContext } from '../context/AuthContext'

function Login() {
    const { signUpWithPopup, signUpWithEmailAndPassword } = useContext(AuthContext)
    const [togglePassword, setTogglePassword] = useState(true)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const emailRef = useRef()
    const nameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()


    const handleGoogleSign = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError('')
            await signUpWithPopup()
            history.push('/home')
        } catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (!emailRef.current.value || !passwordRef.current.value) {
            return setError("Please Fill Inputs")
        }
        try {
            setError('')
            setLoading(true)
            await signUpWithEmailAndPassword(emailRef.current.value, passwordRef.current.value, nameRef.current.value)
            setTimeout(() => {
                history.push('/home')
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
                        <input ref={emailRef} required placeholder="Your Email Address" />
                        <div className='pass-div'>
                            <input ref={passwordRef} required placeholder="Create Password" type={togglePassword ? "password" : "text"} />
                            {togglePassword ? <i onClick={() => setTogglePassword(!togglePassword)} className="fas fa-eye-slash"></i> : <i onClick={() => setTogglePassword(!togglePassword)} className="fas fa-eye"></i>}
                        </div>
                        <div className='pass-div'>
                            <input ref={passwordConfirmRef} required placeholder="Confirm Password" type={togglePassword ? "password" : "text"} />
                            {togglePassword ? <i onClick={() => setTogglePassword(!togglePassword)} className="fas fa-eye-slash"></i> : <i onClick={() => setTogglePassword(!togglePassword)} className="fas fa-eye"></i>}
                        </div>
                        <button onClick={handleSignUp} disabled={loading}>Sign Up</button>
                        <button disabled={loading} className='google-sign' onClick={handleGoogleSign}><i className="fab fa-google"></i> Sign Up with Google</button>
                        <div className="signup-page">
                            <h3 >Already Have an Account ? <Link className="signup-page-link" to="login">Sign In</Link></h3>
                            <Link to="/" className="signup-page-link">Need Help?</Link>
                        </div>
                        <div style={{ width: "300px", wordWrap: "break-word" }}>
                            <h6>{error}</h6>
                        </div>
                    </form>
                </div>
            </div>
            <Footer borderTop={"none"} bg={'#000000bb'} />
        </div>
    )
}

export default Login
