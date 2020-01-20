import React, { Component } from 'react';

class FoodList extends Component {
    render() {
        return (
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

                            <tr>
                                <td>{food.name}</td>
                                <td>{food.calories}</td>
                            </tr>

                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total:</th>
                        <th>{this.props.caloriesConsumed}</th>
                    </tr>
                </tfoot>
            </table>
        );
    }
}

export default FoodList;
