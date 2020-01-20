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
            <td>{food.calories} <input onChange={(event) => this.handleQuantityChange(event, food)} type="number"/></td> 
        </tr>

      ))
  }
   <tr>
    <th>Total:</th>
    <th>{total}</th>
  </tr>
  <button onClick={() => this.handleConsumeFoods(total)} className="confirm-button">Confirm</button>
</table>
        );
    }
}

export default FoodList;