import React, {useEffect, useState} from 'react';
import './App.css';
import LoginForm from './components/LoginForm.js';
import API from './API.js';
import {Switch, Route, Redirect} from 'react-router-dom';
import Homepage from './components/Homepage.js';

function App() {
    const [user, setUser] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (API.hasToken()) {
            API.validate().then(setUser)
                .then(() => setError(false))
                .catch(errorPromise => {
                    errorPromise.then(setError);
                });
        }
    }, [])

    function logout() {
        setUser(false);
        API.clearToken();
    }


    return (
        <div className="App">
            {error && <h2>  {error.message} </h2>}
            <Switch>
                <Route path = '/login'>
                    <LoginForm setError = {setError} handleLogin = {setUser} user = {user}/>
                </Route>
                <Route exact path = "/">
                    {user?  <Homepage user = {user} logout = {logout} /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </div>
    );
}

export default App;
