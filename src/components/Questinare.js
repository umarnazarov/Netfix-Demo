import React, { useState } from 'react'
import "../css/Questinare.css"

function Questinare() {
    const [toggle, setToggle] = useState('')
    const handleTooggle = (el) => {
        setToggle(toggle === el ? '' : el)
    }
    return (
        <div id='faq' className='main-content-questions'>
            <h1>Frequently Asked Questions</h1>
            <div className='main-content-question'>
                <h2 onClick={() => handleTooggle('p1')}>What is Netfix ?</h2>
                <i className={`fas fa-plus ${toggle === 'p1' && 'fa-rotate'}`} ></i>
                <p className={toggle === 'p1' && 'toggleOn'}>Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.<br />
                    You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!</p>
            </div>
            <div className='main-content-question'>
                <h2 onClick={() => handleTooggle('p2')}>How much Netfix cost ?</h2>
                <i className={`fas fa-plus ${toggle === 'p2' && 'fa-rotate'}`}></i>
                <p className={toggle === 'p2' && 'toggleOn'}>Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range is totaly free here. No extra costs, no contracts.</p>
            </div>
            <div className='main-content-question'>
                <h2 onClick={() => handleTooggle('p3')}>Where can i watch ?</h2>
                <i className={`fas fa-plus ${toggle === 'p3' && 'fa-rotate'}`}></i>
                <p className={toggle === 'p3' && 'toggleOn'}>Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.

                    You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.</p>
            </div>
            <div className='main-content-question'>
                <h2 onClick={() => handleTooggle('p4')}>How can i cancel ?</h2>
                <i className={`fas fa-plus ${toggle === 'p4' && 'fa-rotate'}`}></i>
                <p className={toggle === 'p4' && 'toggleOn'}>Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.</p>
            </div>
            <div className='main-content-question'>
                <h2 onClick={() => handleTooggle('p5')}>What can i watch on Netflix?</h2>
                <i className={`fas fa-plus ${toggle === 'p5' && 'fa-rotate'}`}></i>
                <p className={toggle === 'p5' && 'toggleOn'}>Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.</p>
            </div>
            <div className='main-content-question'>
                <h2 onClick={() => handleTooggle('p6')}>Is Netflix good for kids ?</h2>
                <i className={`fas fa-plus ${toggle === 'p6' && 'fa-rotate'}`}></i>
                <p className={toggle === 'p6' && 'toggleOn'}>The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.

                    Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.</p>
            </div>
        </div>
    )
}

export default Questinare
