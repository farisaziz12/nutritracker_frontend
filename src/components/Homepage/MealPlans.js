import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function MealPlans({mealPlans}) {

    const [mealPlanIndex, setMealPlanIndex] = useState(0);

    function handleMoreClick() {
        if (mealPlanIndex + 8 >= mealPlans.length) setMealPlanIndex(mealPlans.length - 4);
        else setMealPlanIndex(mealPlanIndex + 4)
    }
    function handleLessClick() {
        if (mealPlanIndex === 0) return;
        else if (mealPlanIndex < 4) setMealPlanIndex(mealPlanIndex - 1);
        else setMealPlanIndex(mealPlanIndex - 4);
    }
    return (
        <>
            <h2>Your Meal Plans:</h2>
            <p>{mealPlanIndex + 1} - {mealPlanIndex + 4} of {mealPlans.length}</p>
            <div className = "meal-plan-grid" >
                <button onClick = {handleLessClick}>&lt;&lt;</button>
                {mealPlans.slice(mealPlanIndex, mealPlanIndex + 4).map((m, idx) =>  
                <div key = {idx} className = "meal-plan">
                    <h2>{m.name}</h2>
                    <p>Calories: -</p>
                    <Link to = {`/meal_plans/${m.id}`}><button>View</button></Link>
                </div>
                )}
                <div className = "meal-plan">
                    <h2>+</h2>
                    <br></br>
                    <br></br>
                    <button><Link to = "/meal_plans/new">Add new plan</Link></button>
                </div>
                <button onClick = {handleMoreClick}>&gt;&gt;</button>
            </div>
        </>
    )
}

export default MealPlans;
