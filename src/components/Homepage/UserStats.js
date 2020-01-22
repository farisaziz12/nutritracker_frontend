import React from 'react';
import {Link} from 'react-router-dom';

function UserStats({user: {age, weight, height}}) {

    return (
        <div className = "stats">
            <h1>Your health stats:</h1>
            <h3>
                <p>Weight: {weight || "-"} kg</p>
                <p>Height: {height || "-"} cm</p>
                <p>Age: {age || "-"} </p>
                <p>BMI: {height && weight? Math.round(weight/(height/100.0)**2) : "-"}</p>
            </h3>
            <button><Link to ="/edit">Edit</Link></button>
        </div>
    )
}

export default UserStats;
