import React, { Component } from 'react';

class FoodList extends Component {

    handleConsumeFoods = total => {
        this.props.consumeFoods(total)
    }

    handleQuantityChange = (food, plus = true) => {
        const quantity = plus? food.quantity + 1 : food.quantity - 1;
        if (!quantity) return;
        this.props.changeFoodQuantity(quantity, food.id) 
    }

    render() {
        const {total} = this.props;
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
                                <td><img src = {food.image} alt = {food.name} /><div><strong>{food.name}</strong></div></td>
                                <td>{food.calories} </td> 
                                <td>{Math.round(food.fat*100)/100}</td>
                                <td>{Math.round(food.protein*100)/100}</td>
                                <td>{Math.round(food.carbohydrate*100)/100}</td>
                                <td>{food.quantity} <button onClick={() => this.props.removeFood(food.id)} className="delete-button">X</button><button onClick={() => this.handleQuantityChange(food)}>+</button><button onClick={() => this.handleQuantityChange(food, false)}>-</button></td>
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
