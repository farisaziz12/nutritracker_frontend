import React from 'react';
import {useParams, Redirect, Link} from 'react-router-dom';
import MealForm from './MealForm.js';
import Meal from './Meal.js';
import CalorieTrackerContainer from './Homepage/CalorieTrackerContainer.js'
function MealPlanShowPage({mealPlans}) {

    let params = useParams();
    const mealPlan = mealPlans.find(m => m.id === parseInt(params.id, 10));
    console.log(mealPlan);

    if (!mealPlan) return <Redirect to = "/"/>;

    return (
        <div>
            <h1>Meal Plan: {mealPlan.name}</h1>
            <h2>Meals:</h2>
            {mealPlan.meals.map(m => <Meal meal = {m} key = {m.id} />)}
            <MealForm mealPlanId = {mealPlan.id}/>
            <CalorieTrackerContainer/><br></br>
            <Link to ="/">Back</Link>
        </div>
    );
}

export default MealPlanShowPage;
