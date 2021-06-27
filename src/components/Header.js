import React from 'react'
// import { Link } from 'react-router-dom'
import logo from '../images/netflix-logo.png'
import '../css/Header.css'

function Header() {
    return (
        <header className='header'>
            <nav className='navbar'>
                <div className='navbar-nav'>
                    <img id="nav-logo" src={logo} alt='bg' />
                    <a href='/'>Sign In</a>
                </div>
            </nav>
            <div className='header-info-container'>
                <div className='header-info-content'>
                    <h1>Unlimited movies, TV<br /> shows, and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <form>
                        <input required type='text' placeholder='Email Address' />
                        <button>Get Started <i className="fas fa-chevron-right"></i></button>
                    </form>
                    <div className='header-info-ask'>
                        <p>Ready to watch? Enter your email to create or restart your membership.</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export { Header }
