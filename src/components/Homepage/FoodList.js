import React, { Component } from 'react';

class FoodList extends Component {
    render() {
        return (
            <table>
  <tr>
    <th>Food</th>
    <th>Calories per 100g</th>
  </tr>
  {
      this.props.foodsConsumed.map(food => (

        <tr>
            <td>{food.name}</td>
            <td>{food.calories}</td>
        </tr>

      ))
  }
   <tr>
    <th>Total:</th>
    <th>{this.props.caloriesConsumed}</th>
  </tr>
</table>
        );
    }
}

export default FoodList;