import React from 'react';
import {useParams, Redirect, Link} from 'react-router-dom';
import Meal from './Meal.js';
import CalorieTrackerContainer from './Homepage/CalorieTrackerContainer.js'
function MealPlanShowPage({handleMealSubmit, mealPlans}) {

    let params = useParams();
    const mealPlan = mealPlans.find(m => m.id === parseInt(params.id, 10));

    if (!mealPlan) return <Redirect to = "/"/>;

    function caloriesForMealPlan(mealPlan) {
        return mealPlan.meals.reduce((tot, meal) => tot += caloriesForMeal(meal), 0);
    }

    function quantity(food, meal) {
        return meal.meal_foods.find(mf => mf.food_id === food.id).quantity;
    }

    function caloriesForMeal(meal) {
        return meal.foods.reduce((tot, food) => tot+= food.calories*quantity(food, meal), 0);
    }

    return (
        <div>
            <h1>Meal Plan: {mealPlan.name}</h1>
            <h2>Calories: {caloriesForMealPlan(mealPlan)}</h2>
            <Link to ="/">Back</Link>
            <h2>Meals:</h2>
            {mealPlan.meals.map(m => <Meal meal = {{...m, total: caloriesForMeal(m)}} key = {m.id} />)}
            <CalorieTrackerContainer handleMealSubmit = {handleMealSubmit} mealPlanId = {mealPlan.id}/><br></br>
        </div>
    );
}

export default MealPlanShowPage;
