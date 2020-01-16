import React, {useEffect, useState} from 'react';
import './App.css';
import LoginForm from './components/LoginForm.js';
import API from './API.js';
import {Switch, Route} from 'react-router-dom';
import Homepage from './components/Homepage.js';

function App() {
    const [user, setUser] = useState(false);
    const [error, setError] = useState(false);
    const [validatedUser, setValidatedUser] = useState(false);

    useEffect(() => {
        if (API.hasToken()) {
            API.validate().then(setUser)
                .then(() => setValidatedUser(true))
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
            <Switch>
                <Route exact path = '/login'>
                    <LoginForm handleLogin = {setUser} user = {user}/>
                </Route>
                <Route path = "/">
                    <Homepage user = {user} />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
