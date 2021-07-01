import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'
import { AuthContext } from '../context/AuthContext'


function PrivateLoginPage({ component: Component, ...rest }) {
    const { currentUser } = useContext(AuthContext)
    return (
        <Route {...rest} render={(props) => { return currentUser ? <Redirect to='/home/profile' /> : <Component {...props} /> }}></Route>
    )
}

export default PrivateLoginPage