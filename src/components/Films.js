import React, { useEffect, useState } from 'react'
import '../css/Films.css'
import { Link } from 'react-router-dom'
import logo from '../images/netflix-logo.png'
import { firestore } from '../firebase/firebase'
import Navbar from './Navbar'


function Films() {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const db = await firestore.collection('data').get()
            setData(db.docs.map(doc => doc.data()))
        }
        return fetchData()
    }, [])
    return (
        <div>
            <div>
                <Navbar />
            </div>
        </div>
    )
}

export default Films
