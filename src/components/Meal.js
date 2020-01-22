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
                            <th>Fat/100g</th>
                            <th>Protein/100g</th>
                            <th>Carbohydrate/100g</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            meal.foods.map((food, idx) => (

                                <tr key = {idx}>
                                    <td><img src = {food.image} alt = {food.name} /><div><strong>{food.name}</strong></div></td>
                                    <td>{food.calories} </td> 
                                    <td>{food.fat}</td>
                                    <td>{food.protein}</td>
                                    <td>{food.carbohydrate}</td>
                                    <td>{quantity(food)}</td>
                                </tr>

                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total:</th>
                            <th>{Math.round(meal.total.calories*100)/100}</th>
                            <th>{Math.round(meal.total.fat*100)/100}</th>
                            <th>{Math.round(meal.total.protein*100)/100}</th>
                            <th>{Math.round(meal.total.carbohydrate*100)/100}</th>
                        </tr>
                    </tfoot>
                </table>
            </div></>)
}

export default Meal;
