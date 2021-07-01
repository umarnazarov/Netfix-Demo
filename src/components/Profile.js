import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../images/netflix-logo.png'
import { AuthContext } from "../context/AuthContext"
import { firestore } from '../firebase/firebase'
import Navbar from './Navbar'
import '../css/Profile.css'
import loadAnim from "../images/loading.gif"

function Profile() {
    const { currentUser } = useContext(AuthContext)
    const [icons, setIcons] = useState(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({ img: loadAnim, name: '' })
    useEffect(() => {
        const getData = async () => {
            const db = await firestore.collection("icons").get()
            setIcons(db.docs.map(doc => doc.data()))
        }
        return getData()
    }, [data])
    useEffect(() => {
        const getData = async () => {
            const db = await firestore.collection("users").doc(currentUser.uid).get()
            setData(db.data())
        }
        return getData()
    }, [])
    const handleIcons = () => {
        const theicons = icons.map(obj => (
            <div onClick={(e) => handleChangeIcon(obj.img, e)} x className="icon-cont">
                <img alt="icon" src={obj.img} />
            </div>
        ))
        return theicons
    }
    const handleChangeIcon = async (img, e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const userD = await firestore.collection("users").doc(currentUser.uid).get()
            await firestore.collection("users").doc(currentUser.uid).update({ img })
            const newlyuserD = await firestore.collection("users").doc(currentUser.uid).get()
            setData(newlyuserD.data())
        } catch (e) {
            alert(e)
        }
        setLoading(false)
    }
    return (
        <main className="profile-main">
            <Navbar />
            <div className="profile-content">
                <div className="profile-container">
                    <div className="profile-container-text">
                        <div className="profile-container-text1">
                            <Link to='/home' ><i className="fas fa-arrow-left"></i></Link>
                            <h2>Edit Profile</h2>
                            <h4>Choose a profile icon</h4>
                        </div>
                        <div className="profile-container-text2">
                            <h4>{data.name}</h4>
                            <img className="user-image" src={loading ? loadAnim : data.img} />
                        </div>
                    </div>
                    <div className="profile-icons">
                        {icons && handleIcons()}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Profile
