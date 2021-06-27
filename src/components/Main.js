import React from 'react'
import '../css/Main.css'
import tv from '../images/tv.svg'
import downloadicon from '../images/download-icon.svg'
import earthgrid from '../images/earth-grid.svg'
import Questinare from './Questinare'


function Main() {
    return (
        <main className="main-container">
            <div className='main-content-card'>
                <div className='main-content-text'>
                    <div className='main-text'>
                        <h1>Enjoy on your TV.</h1>
                        <p>Watch on Smart TVs, Playstation, Xbox,<br /> Chromecast, Apple TV, Blu-ray players,<br /> and more.</p>
                    </div>
                </div>
                <div className='main-image'>
                    <img className='main-content-img' src={tv} />
                </div>
            </div>
            <div className='main-content-card'>
                <div className='main-content-text'>
                    <div className='main-text'>
                        <h1>Download your shows<br /> to watch offline.</h1>
                        <p className='main-text-right'>Save your favorites easily <br /> and always have something to watch.</p>
                    </div>
                </div>
                <div className='main-image main-image-snd '>
                    <img className='main-content-img' src={downloadicon} />
                </div>
            </div>
            <div className='main-content-card'>
                <div className='main-content-text'>
                    <div className='main-text'>
                        <h1>Watch everywhere.</h1>
                        <p>Stream unlimited movies and <br /> TV shows on your phone, tablet, <br />laptop, and TV without paying more.</p>
                    </div>
                </div>
                <div className='main-image'>
                    <img className='main-content-img' src={earthgrid} />
                </div>
            </div>
            <Questinare />
        </main>
    )
}

export default Main
