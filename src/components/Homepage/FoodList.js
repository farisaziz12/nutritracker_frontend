import React, { Component } from 'react';

class FoodList extends Component {

    handleConsumeFoods = total => {
        this.props.consumeFoods(total)
    }

    handleQuantityChange = (event, food) => {
        const quantity = event.target.value
        this.props.changeFoodQuantiy(quantity, food.id) //send up to parent to change calorie of chosen food by selected quantity in consumed foods state
    }

    render() {
        const totalArr = this.props.foodsConsumed.map(food => food.calories)
        const total = totalArr[0]? totalArr.reduce((total, cal) => total + cal) : 0 
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
                        this.props.foodsConsumed.map((food, idx) => (

                            <tr key = {idx}>
                                <td>{food.name}</td>
                                <td>{food.calories} <input onChange={(event) => this.handleQuantityChange(event, food)} type="number" placeholder = {0}/></td> 
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
