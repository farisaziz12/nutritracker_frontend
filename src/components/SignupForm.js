import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom"
import API from '../API.js'


function SignupForm({setError, user, handleLogin}) {

    const [formData, setFormData] = useState({email: "", password: "", password_confirmation: "", name: ""});

    if (user) return <Redirect to="/"/>;

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
       API.signUp(formData)
            .then(handleLogin)
            .then(() => setError(false))
            .catch(errorPromise => {
                errorPromise.then(setError);
            });
    }
    

    return (
        <>
            <h2>Create an account with NutriTracker</h2>
            <form onSubmit = {handleSubmit}>
                <label>Name:
                    <input type = "text" name = "name" value = {formData.name} onChange = {handleChange}></input>
                </label><br></br>
                <label>Email:
                    <input type = "text" name = "email" value = {formData.email} onChange = {handleChange}></input>
                </label><br></br>
                <label>Password:
                    <input type = "password" name = "password" value = {formData.password} onChange = {handleChange}></input>
                </label><br></br>
                <label>Password confirmation:
                    <input type = "password" name = "password_confirmation" value = {formData.password_confirmation} onChange = {handleChange}></input><br></br>
                </label>
                <input type = "submit" value = "Submit"></input>

            </form>
            <Link to="/login">Back to login page</Link>
        </>
    )
}

export default SignupForm;
