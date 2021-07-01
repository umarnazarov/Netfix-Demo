import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/netflix-logo.png'
import '../css/Header.css'
import { AuthContext } from '../context/AuthContext'

function Header() {
    const { currentUser, emailVal, setEmailVal } = useContext(AuthContext)
    const emailRef = useRef()
    const handleChange = () => {
        setEmailVal(emailRef.current.value)
    }
    return (
        <header className='header'>
            <nav className='navbar'>
                <div className='navbar-nav'>
                    <Link to='/home'><img id="nav-logo" src={logo} alt='logo' /></Link>
                    {currentUser ? <Link className="auth-link" to='/home/profile'>Profile</Link> : <Link className="auth-link" to='/login'>Sign In</Link>}
                </div>
            </nav>
            <div className='header-info-container'>
                <div className='header-info-content'>
                    <h1>Unlimited movies, TV<br /> shows, and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    {!currentUser ?
                        <>
                            <form>
                                <input onChange={handleChange} required type='text' ref={emailRef} placeholder='Email Address' />
                                <Link className='link' to={emailVal ? "/signup" : '/home'}>Get Started <i className="fas fa-chevron-right"></i></Link>
                            </form>
                            <div className='header-info-ask'>
                                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                            </div>
                        </>
                        : <div className='watch-link-cont'><Link className="watch-link" to='/home/films'>Watch Now!</Link></div>}
                </div>
            </div>
        </header>
    )
}

export { Header }
