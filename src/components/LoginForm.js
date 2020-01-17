import React, {useState} from 'react';
import {Redirect} from "react-router-dom"
import API from '../API.js'


function LoginForm({setError, user, handleLogin}) {
    const [formData, setFormData] = useState({email: "", password: ""});

    if (user) return <Redirect to="/"/>;

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        API.loginUser(formData)
            .then(handleLogin)
            .then(() => setError(false))
            .catch(errorPromise => {
                errorPromise.then(setError);
            });
    }
    

    return (
        <>
            <h2>Sign in to NutriTracker</h2>
            <form onSubmit = {handleSubmit}>
                <label>Email:
                    <input type = "text" name = "email" value = {formData.email} onChange = {handleChange}></input>
                </label><br></br>
                <label>Password:
                    <input type = "password" name = "password" value = {formData.password} onChange = {handleChange}></input>
                </label>
                <input type = "submit" value = "Log in"></input>

            </form>
        </>
    )
}

export default LoginForm;
