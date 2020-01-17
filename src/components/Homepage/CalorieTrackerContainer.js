import React, { Component } from 'react';
import CaloriesLeft from './CaloriesLeft';
import FoodAdder from './FoodAdder';
import FoodList from './FoodList';
import ErrorMessage from './ErrorMessage';
class CalorieTrackerContainer extends Component {
    state = { 
        calorieLimit: 2500, 
        caloriesConsumed: 0, 
        foodsConsumed: [], 
        errorMessage: undefined
     }

     foodSubmitHandler = name => {
         fetch(`http://localhost:3000/search?food=${name}`)
         .then(resp => resp.json())
         .then(calorieData => {
         let food = {
             name: name,
             calories: Math.round(calorieData.ENERC_KCAL)
            }
        if (calorieData.ENERC_KCAL === undefined) {
            this.setState({
                errorMessage: "Food not found. Try another food/name"
            })
        } else {
         this.setState({
             errorMessage: undefined, 
             foodsConsumed: [...this.state.foodsConsumed, food],
             caloriesConsumed: this.state.caloriesConsumed + food.calories
         })
        }
         })
     }

    render() {
        return (
            <>
                <CaloriesLeft calorieLimit={this.state.calorieLimit} caloriesConsumed={this.state.caloriesConsumed}/>
                <FoodAdder  foodHandler={this.foodSubmitHandler}/>
                {this.state.errorMessage !== undefined&&
                    <ErrorMessage errorMessage={this.state.errorMessage}/>
                }
                <FoodList caloriesConsumed={this.state.caloriesConsumed} foodsConsumed={this.state.foodsConsumed}/>
            </>
        );
    }
}

export default CalorieTrackerContainer;