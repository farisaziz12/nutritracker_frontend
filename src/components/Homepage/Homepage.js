import React from 'react';
import HomepageHeader from './HomepageHeader'
import LogoutButton from './LogoutButton';
import CalorieTrackerContainer from './CalorieTrackerContainer';
import UserStats from './UserStats.js';
import MealPlans from './MealPlans.js';
// import { Menu, Segment } from 'semantic-ui-react'
function Homepage({user, logout}) {

    return (
        <>
            <LogoutButton logout={logout}/>
            <UserStats user = {user} />
            <MealPlans mealPlans = {user.meal_plans} />
            <HomepageHeader name={user.name}/>
            <CalorieTrackerContainer/>
        </>
    )
}

export default Homepage;
