import React from 'react';

function Meal({meal}) {
    function quantity(food) {
        return meal.meal_foods.find(mf => mf.food_id === food.id).quantity
    }
    return (
        <>
            <h2>{meal.name}</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Food</th>
                            <th>Calories per 100g</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            meal.foods.map((food, idx) => (

                                <tr key = {idx}>
                                    <td>{food.name}</td>
                                    <td>{food.calories} </td> 
                                    <td>{quantity(food)}</td>
                                </tr>

                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total:</th>
                            <th>{meal.total}</th>
                        </tr>
                    </tfoot>
                </table>
            </div></>)
}

export default Meal;
