import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/netflix-logo.png'
import "../css/Login.css"
import Footer from './Footer'

function Login() {
    const [togglePassword, setTogglePassword] = useState(true)
    return (
        <div className='login-container'>
            <div className="login-content">
                <Link to='/home'><img id="login-logo" src={logo} alt='bg' /></Link>
                <div className="login-hero">
                    <form className="login-form">
                        <h2>Sign In</h2>
                        <input placeholder="Your Email Address" />
                        <div className='pass-div'>
                            <input placeholder="Your Password" type={togglePassword ? "password" : "text"} />
                            {togglePassword ? <i onClick={() => setTogglePassword(!togglePassword)} className="fas fa-eye-slash"></i> : <i onClick={() => setTogglePassword(!togglePassword)} className="fas fa-eye"></i>}
                        </div>
                        <button>Sign In</button>
                    </form>
                </div>
            </div>
            <Footer borderTop={"none"} bg={'#000000bb'} />
        </div>
    )
}

export default Login
