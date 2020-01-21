import React, { Component } from 'react'
import './css/homepage.css';

function LogoutButton({logout}){
    return (
        <button className="button" onClick = {logout}> Log out</button>
    );

}

export default LogoutButton;
