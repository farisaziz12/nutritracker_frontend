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
        OrgCals: [],
        errorMessage: undefined
     }

     foodSubmitHandler = name => {
         fetch(`http://localhost:3000/search?food=${name}`)
         .then(resp => resp.json())
         .then(calorieData => {
         let food = {
             id: this.state.foodsConsumed[0]? this.state.foodsConsumed[this.state.foodsConsumed.length - 1].id + 1 : 1, 
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
             OrgCals: [...this.state.OrgCals, {id: food.id, caloires: food.calories}]
         })
        }
         })
     }

     consumeFoods = total => {
         this.setState({
             caloriesConsumed: this.state.caloriesConsumed + total, 
             foodsConsumed: []
         })
     }

     changeFoodQuantiy = (quantity, foodId) => {
        const food = this.state.foodsConsumed.find(food => food.id === foodId)

            if (food && parseInt(quantity) !== 0) {
                const orgCal = this.state.OrgCals.find(foodCal => foodCal.id === foodId )
                food.calories = orgCal.caloires * quantity
            }

        this.setState({
            foodsConsumed: this.state.foodsConsumed
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
                <FoodList changeFoodQuantiy={this.changeFoodQuantiy} consumeFoods={this.consumeFoods} caloriesConsumed={this.state.caloriesConsumed} foodsConsumed={this.state.foodsConsumed}/>
            </>
        );
    }
}

export default CalorieTrackerContainer;