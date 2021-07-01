import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'
import { AuthContext } from '../context/AuthContext'


function PrivateFilmRoute({ component: Component, ...rest }) {
    console.log(Component)
    const { currentUser } = useContext(AuthContext)
    return (
        <Route {...rest} render={(props) => { return !currentUser ? <Redirect to='/login' /> : <Component {...props} /> }}></Route>
    )
}

export default PrivateFilmRoute