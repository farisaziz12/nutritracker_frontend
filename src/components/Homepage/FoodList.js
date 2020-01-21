import React, { Component } from 'react';

class FoodList extends Component {

    handleConsumeFoods = total => {
        this.props.consumeFoods(total)
    }

    handleQuantityChange = (event, food) => {
        const quantity = event.target.value
        this.props.changeFoodQuantity(quantity, food.id) //send up to parent to change calorie of chosen food by selected quantity in consumed foods state
    }

    render() {
        const total = this.props.foods.reduce((tot, curr) => tot += curr.calories*curr.quantity, 0) ;
        return (<>
            <table>
                <thead>
                    <tr>
                        <th>Food</th>
                        <th>Calories per 100g</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.foods.map((food, idx) => (

                            <tr key = {idx}>
                                <td>{food.name}</td>
                                <td>{food.calories*food.quantity} <input value = {food.quantity} onChange={(event) => this.handleQuantityChange(event, food)} type="number"/><button onClick={() => this.props.removeFood(food.id)} className="delete-button">X</button></td> 
                            </tr>

                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total:</th>
                        <th>{total}</th>
                    </tr>
                </tfoot>
            </table>
                <button onClick={() => this.handleConsumeFoods(total)} className="confirm-button">Confirm</button>
            </>
        );
    }
}

export default FoodList;
