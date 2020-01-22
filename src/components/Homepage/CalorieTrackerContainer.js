import React, { Component } from 'react';
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

    total = (foods) => ( foods.reduce((tot, curr) =>{
        tot.calories += curr.calories*curr.quantity;
        tot.fat +=curr.fat*curr.quantity;
        tot.protein +=curr.protein*curr.quantity;
        tot.carbohydrate +=curr.carbohydrate*curr.quantity;
        return tot;
    }, {calories: 0, fat: 0, carbohydrate: 0, protein: 0}) )

     foodSubmitHandler = ({name}) => {
         fetch(`http://localhost:3000/search?food=${name}`)
             .then(resp => resp.json())
             .then(calorieData => {
                 let newFood = {
                     id: this.state.foods[0]? this.state.foods[this.state.foods.length - 1].id + 1 : 1, 
                     name: name,
                     calories: Math.round(calorieData.ENERC_KCAL),
                     fat: calorieData.FAT || 0.0,
                     carbohydrate: calorieData.CHOCDF || 0.0,
                     protein: calorieData.PROCNT || 0.0,
                     quantity: 1,
                     image: calorieData.image
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
        if (this.total(this.state.foods).calories > this.props.allowed) {
            this.setState({ errorMessage: "This meal exceeds your calorie limit for meal plans. Either lower your limit or eat less food" });
            return;
        }
        this.props.handleMealSubmit({name: this.state.mealName, foods: this.state.foods, meal_plan_id: this.props.mealPlanId})
            .then(() => this.setState({ 
                calorieLimit: 2500, 
                caloriesConsumed: 0, 
                foods: [],
                errorMessage: undefined,
                mealName: ""
            }))
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
                <FoodList 
                    removeFood={this.removeFood} 
                    total = {this.total(this.state.foods)}
                    changeFoodQuantity={this.changeFoodQuantity} 
                    consumeFoods={this.consumeFoods} 
                    caloriesConsumed={this.state.caloriesConsumed} 
                    foods={this.state.foods}
                />
            </>
        );
    }
}

export default CalorieTrackerContainer;
