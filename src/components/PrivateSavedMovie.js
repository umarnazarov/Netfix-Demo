import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'
import { AuthContext } from '../context/AuthContext'


function PrivateSavedMovie({ component: Component, ...rest }) {
    const { currentUser } = useContext(AuthContext)
    return (
        <Route {...rest} render={(props) => { return !currentUser ? <Redirect to='/login' /> : <Component {...props} /> }}></Route>
    )
}

export default PrivateSavedMovie