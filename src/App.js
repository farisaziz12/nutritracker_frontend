import React, {useEffect, useState} from 'react';
import MealPlanShowPage from './components/MealPlanShowPage.js';
import MealPlanForm from './components/MealPlanForm.js';
import './App.css';
import LoginForm from './components/LoginForm.js';
import SignupForm from './components/SignupForm.js';
import API from './API.js';
import {useHistory, Switch, Route, Redirect} from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';

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

    function handleMealPlanSubmit(mealPlan) {
        API.newMealPlan(mealPlan)
            .then(mealPlan => setUser({...user, meal_plans: [...user.meal_plans, mealPlan]}))
            .then(() => history.goBack())
    }


    let history = useHistory();
   
    return (
        <div className="App">
            {error && <h2>  {error.message} </h2>}
            <Switch>
                <Route path = '/login'>
                    <LoginForm setError = {setError} handleLogin = {setUser} user = {user}/>
                </Route>
                <Route path = '/signup'>
                    <SignupForm setError = {setError} handleLogin = {setUser} user = {user}/>
                </Route>
                <Route path = "/meal_plans/new">
                    <MealPlanForm handleMealPlanSubmit = {handleMealPlanSubmit}/>
                </Route>
                <Route path = "/meal_plans/:id">
                    <MealPlanShowPage mealPlans = {user.meal_plans || []} />
                </Route>
                <Route exact path = "/">
                    {user?  <Homepage user = {user} logout = {logout} /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </div>
    );
}

export default App;
