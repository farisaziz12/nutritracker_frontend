import React from 'react';

function Meal({meal}) {
    return (
        <>
            <h2>{meal.name}</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Food</th>
                            <th>Calories per 100g</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            meal.foods.map((food, idx) => (

                                <tr key = {idx}>
                                    <td>{food.name}</td>
                                    <td>{food.calories} </td> 
                                </tr>

                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total:</th>
                            <th>{meal.foods.reduce((acc, curr) => acc + curr.calories, 0)}</th>
                        </tr>
                    </tfoot>
                </table>
            </div></>)
}

export default Meal;
