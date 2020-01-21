import React, { Component } from 'react';
import API from '../../API.js'
import CaloriesLeft from './CaloriesLeft';
import FoodAdder from './FoodAdder';
import FoodList from './FoodList';
import ErrorMessage from './ErrorMessage';
class CalorieTrackerContainer extends Component {
    state = { 
        calorieLimit: 2500, 
        caloriesConsumed: 0, 
        foods: [],
        errorMessage: undefined,
        mealName: ""
     }

     foodSubmitHandler = ({name}) => {
         fetch(`http://localhost:3000/search?food=${name}`)
             .then(resp => resp.json())
             .then(calorieData => {
                 let newFood = {
                     id: this.state.foods[0]? this.state.foods[this.state.foods.length - 1].id + 1 : 1, 
                     name: name,
                     calories: Math.round(calorieData.ENERC_KCAL),
                     quantity: 1
                 }
                 if (calorieData.ENERC_KCAL === undefined) {
                     this.setState({
                         errorMessage: "Food not found. Try another food/name"
                     })
                 } else {
                     this.setState({
                         errorMessage: undefined, 
                         foods: [...this.state.foods, newFood] 
                     })
                 }
             })
     }

    consumeFoods = () => {
        if (this.state.foods.length === 0) {
            this.setState({ errorMessage: "A meal must contain at least one food" });
            return;
        } 
        if (!this.state.mealName) {
            this.setState({ errorMessage: "A meal must have a name" });
            return;
        }
        this.props.handleMealSubmit({name: this.state.mealName, foods: this.state.foods, meal_plan_id: this.props.mealPlanId})
    }

    changeFoodQuantity = (quantity, foodId) => {
        const food = this.state.foods.find(food => food.id === foodId)

        if (food && parseInt(quantity) !== 0) {
            this.setState({
                foods: this.state.foods.map(f => {
                    if (f.id === foodId) f.quantity = parseInt(quantity, 10);
                    return f;
                })
            })
        }

    }

    handleMealNameChange = e => {
        this.setState({
            mealName: e.target.value
        });
    }

     removeFood = foodId => {
        const newfoods = this.state.foods.filter(food => food.id !== foodId)
        this.setState({
            foods: newfoods
        })
      }

    render() {
        return (
            <>
                <FoodAdder mealName = {this.state.mealName} handleMealNameChange = {this.handleMealNameChange}  foodHandler={this.foodSubmitHandler}/>
                {this.state.errorMessage !== undefined&&
                <ErrorMessage errorMessage={this.state.errorMessage}/>
                }
                <FoodList removeFood={this.removeFood} changeFoodQuantity={this.changeFoodQuantity} consumeFoods={this.consumeFoods} caloriesConsumed={this.state.caloriesConsumed} foods={this.state.foods}/>
            </>
        );
    }
}

export default CalorieTrackerContainer;
