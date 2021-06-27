import React from 'react'
import "../css/Footer.css"

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer-content'>
                <div id="footer-main-text"><a href='#'>Questions? Contact us.</a></div>
                <div className='footer-links'>
                    <ul className='footer-links-collumn'>
                        <li className='footer-link'><a href='#faq'>FAQ</a></li>
                        <li className='footer-link'><a href='#'>Investor Relations</a></li>
                        <li className='footer-link'><a href='#'>Privacy</a></li>
                        <li className='footer-link'><a href='#'>Speed Test</a></li>
                    </ul>
                    <ul className='footer-links-collumn'>
                        <li className='footer-link'><a href='#'>Help Center</a></li>
                        <li className='footer-link'><a href='#'>Jobs</a></li>
                        <li className='footer-link'><a href='#'>Cookie Prferences</a></li>
                        <li className='footer-link'><a href='#'>Legal Notices</a></li>
                    </ul>
                    <ul className='footer-links-collumn'>
                        <li className='footer-link'><a href='#'>Account</a></li>
                        <li className='footer-link'><a href='#'>Ways to Watch</a></li>
                        <li className='footer-link'><a href='#'>Corporate Information</a></li>
                        <li className='footer-link'><a href='#'>Netflix Oginals</a></li>
                    </ul>
                    <ul className='footer-links-collumn'>
                        <li className='footer-link'><a href='#'>Media Center</a></li>
                        <li className='footer-link'><a href='#'>Terms of use</a></li>
                        <li className='footer-link'><a href='#'>Contact Us</a></li>
                    </ul>
                </div>
                <div id="directedby"><span id='net-demo'>Netflix Demo by Nazarov Umar</span></div>
            </div>
        </footer>
    )
}

export default Footer
