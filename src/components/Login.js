import React, { useState, useContext, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../images/netflix-logo.png'
import "../css/LoginSignup.css"
import Footer from './Footer'
import LoaderTwo from "./LoaderTwo"
import { AuthContext } from '../context/AuthContext'

function Login() {
    const { signInPopup, signInWithEmailAndPassword } = useContext(AuthContext)
    const [togglePassword, setTogglePassword] = useState(true)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleGoogleSign = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError('')
            await signInPopup()
            setTimeout(() => {
                history.push('/home/profile')
            }, 1000)
        } catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        if (!emailRef.current.value || !passwordRef.current.value) {
            return setError("Please Fill Inputs")
        }
        try {
            setError('')
            setLoading(true)
            await signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
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
                    <form onSubmit={handleSignIn} className="login-form">
                        <h2>Sign In</h2>
                        <input ref={emailRef} required placeholder="Your Email Address" />
                        <div className='pass-div'>
                            <input ref={passwordRef} required placeholder="Your Password" type={togglePassword ? "password" : "text"} />
                            {togglePassword ? <i onClick={() => setTogglePassword(!togglePassword)} className="fas fa-eye-slash"></i> : <i onClick={() => setTogglePassword(!togglePassword)} className="fas fa-eye"></i>}
                        </div>
                        {loading ? <LoaderTwo height={"50px"} /> : <button onClick={handleSignIn} disabled={loading}>Sign In</button>}
                        <div className="signup-page">
                            <h3 >New to Netflix ? <Link className="signup-page-link" to="signup">Sign Up</Link></h3>
                            <Link to="/forgotpassword" className="signup-page-link">Need Help?</Link>
                        </div>
                        <div className="signup-page">
                            <Link to="/" className="signup-page-link">Home Page</Link>
                            <span disabled={loading} className='google-sign' onClick={handleGoogleSign}><i className="fab fa-google"></i> Sign in with Google</span>
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
