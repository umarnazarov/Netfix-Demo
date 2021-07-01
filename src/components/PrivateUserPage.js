import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext } from '../context/AuthContext'

function PrivateUserPage({ component: Compnent, ...rest }) {
    const { currentUser } = useContext(AuthContext)
    return (
        <Route {...rest} render={props => { return currentUser ? <Compnent {...props} /> : <Redirect to='/login' /> }} ></Route>
    )
}

export default PrivateUserPage
