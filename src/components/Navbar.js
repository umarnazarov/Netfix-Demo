import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import '../css/Profile.css'
import logo from '../images/netflix-logo.png'
import { AuthContext } from "../context/AuthContext"
import { firestore } from '../firebase/firebase'
import "../css/Navbar.css"

function Navbar() {
    const { logOut, currentUser } = useContext(AuthContext)
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        const getData = async () => {
            const db = await firestore.collection("users").doc(currentUser.uid).get()
            const data = db.data()
            setUserData(data)
        }
        return getData()
    }, [])
    const history = useHistory()
    const handleLogOut = () => {
        logOut()
        history.push('/home')
    }
    return (
        <nav className='side-navbar'>
            <div className="navbar-profile-links">
                <NavLink activeClassName="active" exact className="navbar-profile-link" to='/home'><i className="fas fa-home"></i></NavLink>
                <NavLink activeClassName="active" exact className="navbar-profile-link" to="/home/profile"><i className="fas fa-user"></i></NavLink>
                <NavLink activeClassName="active" exact className="navbar-profile-link" to="/home/films"><i className="fas fa-film"></i></NavLink>
                <NavLink activeClassName="active" exact className="navbar-profile-link" to="/home/films/saved"><i className="fas fa-folder-open"></i></NavLink>
                <p className="navbar-profile-link" onClick={handleLogOut}><i className="fas fa-sign-out-alt"></i></p>
            </div>
        </nav>
    )
}

export default Navbar
