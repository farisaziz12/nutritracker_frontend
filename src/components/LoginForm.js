import React, {useState, Fragment} from 'react';
import {Redirect} from "react-router-dom"
import API from '../API.js'


function LoginForm({user, handleLogin}) {
    const [formData, setFormData] = useState({email: "", password: ""});

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        API.loginUser(formData).then(handleLogin)
    }

    return (
        <>
            <h2>Sign up to NutriTracker!</h2>
            <form onSubmit = {handleSubmit}>
                <label>Email:
                    <input type = "text" name = "email" value = {formData.email} onChange = {handleChange}></input>
                </label><br></br>
                <label>Password:
                    <input type = "password" name = "password" value = {formData.password} onChange = {handleChange}></input>
                </label>
                <input type = "submit" value = "Log in"></input>

            </form>
            {user && <Redirect to="/" />}
        </>
    )
}

export default LoginForm;
