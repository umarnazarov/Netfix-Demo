import React, { createContext, useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase'

export const MoviesContext = createContext()

function MoviesProvider(props) {
    const [data, setData] = useState([])
    const [loading, setLoaing] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoaing(true)
                const db = await firestore.collection('data').get()
                setData(db.docs.map(doc => doc.data()))
            } catch (e) {
                console.log(e)
            }
            setLoaing(false)
        }
        return fetchData()
    }, [])
    return (
        <MoviesContext.Provider value={{ data, loading }}>
            {props.children}
        </MoviesContext.Provider>
    )
}

export default MoviesProvider