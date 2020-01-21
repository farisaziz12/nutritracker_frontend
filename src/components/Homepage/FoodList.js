import React, { Component } from 'react';

class FoodList extends Component {

    handleConsumeFoods = total => {
        this.props.consumeFoods(total)
    }

    handleQuantityChange = (event, food) => {
        const quantity = event.target.value
        if (!quantity) return;
        this.props.changeFoodQuantity(quantity, food.id) //send up to parent to change calorie of chosen food by selected quantity in consumed foods state
    }

    render() {
        const total = this.props.foods.reduce((tot, curr) =>{
            tot.calories += curr.calories*curr.quantity;
            tot.fat +=curr.fat*curr.quantity;
            tot.protein +=curr.protein*curr.quantity;
            tot.carbohydrate +=curr.carbohydrate*curr.quantity;
            return tot;
        }, {calories: 0, fat: 0, carbohydrate: 0, protein: 0}) ;
        
        return (<>
            <table>
                <thead>
                    <tr>
                        <th>Food</th>
                        <th>Calories per 100g</th>
                        <th>Fat/100g</th>
                        <th>Protein/100g</th>
                        <th>Carbohydrate/100g</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.foods.map((food, idx) => (

                            <tr key = {idx}>
                                <td>{food.name}</td>
                                <td>{food.calories} <input value = {food.quantity} onChange={(event) => this.handleQuantityChange(event, food)} type="number"/><button onClick={() => this.props.removeFood(food.id)} className="delete-button">X</button></td> 
                                <td>{Math.round(food.fat*100)/100}</td>
                                <td>{Math.round(food.protein*100)/100}</td>
                                <td>{Math.round(food.carbohydrate*100)/100}</td>
                                <td>{food.quantity}</td>
                            </tr>

                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total:</th>
                        <th>{Math.round(total.calories*100)/100}</th>
                        <th>{Math.round(total.fat*100)/100}</th>
                        <th>{Math.round(total.protein*100)/100}</th>
                        <th>{Math.round(total.carbohydrate*100)/100}</th>
                    </tr>
                </tfoot>
            </table>
            <button onClick={() => this.handleConsumeFoods(total)} className="confirm-button">Confirm</button>
        </>
        );
    }
}

export default FoodList;
