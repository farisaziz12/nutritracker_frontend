import React, {useState} from 'react';
import {useParams, Redirect, Link} from 'react-router-dom';
import Meal from './Meal.js';
import CalorieTrackerContainer from './Homepage/CalorieTrackerContainer.js'

function MealPlanShowPage({handleMealRemoveClick, handleMealSubmit, mealPlans}) {

    let params = useParams();
    const mealPlan = mealPlans.find(m => m.id === parseInt(params.id, 10));
    const [addButtonClicked, setAddButtonClicked] = useState(false)

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

    function totalsForMeal(meal) {

        return meal.foods.reduce((tot, curr) =>{
            tot.calories += curr.calories*quantity(curr, meal);
            tot.fat +=curr.fat*quantity(curr,meal);
            tot.protein +=curr.protein*quantity(curr,meal);
            tot.carbohydrate +=curr.carbohydrate*quantity(curr,meal);
            return tot;
        }, {calories: 0, fat: 0, carbohydrate: 0, protein: 0}) ;
    }

    return (
        <div>
            <Link to ="/">Dashboard</Link>
            <h1>Meal Plan: {mealPlan.name}</h1>
            <h2>Calories: {caloriesForMealPlan(mealPlan)}</h2>
            <button className = "remove" onClick = {() => handleMealRemoveClick(params.id)}>Remove plan</button>
            <h2>Meals:</h2>
            {mealPlan.meals.map(m => <Meal meal = {{...m, total: totalsForMeal(m)}} key = {m.id} />)}
            <button onClick = {() => setAddButtonClicked(!addButtonClicked)} className = "add">Add new meal</button><br></br> 
            {addButtonClicked? <CalorieTrackerContainer handleMealSubmit = {handleMealSubmit} mealPlanId = {mealPlan.id}/>: null}
            
        </div>
    );
}

export default MealPlanShowPage;
