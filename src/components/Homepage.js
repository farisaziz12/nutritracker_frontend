import React from 'react';
import {Redirect} from 'react-router-dom'
function Homepage({user, logout}) {

    return (
        <>
            <div>Welcome! {user.name}</div>
            <button onClick = {logout}>Log out</button>
        </>
    )
}

export default Homepage;
