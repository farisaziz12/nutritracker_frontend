import React from 'react'
import './css/homepage.css';

function LogoutButton({logout}){
    return (
        <button className="logout button" onClick = {logout}> Log out</button>
    );

}

export default LogoutButton;
