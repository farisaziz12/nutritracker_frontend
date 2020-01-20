import React, {useState} from 'react';
import {Link} from "react-router-dom";

function MealPlanForm({handleMealPlanSubmit}) {

    const [formdata, setFormData] = useState({name: ""});

    function handleSubmit(e) {
        e.preventDefault();
        handleMealPlanSubmit(formdata);
    }

    return (
        <div>
            <h2>New Meal Plan:</h2>
            <form onSubmit = {handleSubmit} onChange = {e => setFormData({...formdata, [e.target.name]: e.target.value})}>
                <label>
                    Name:
                    <input onChange = {() => null} value = {formdata.name} type = "text" name = "name"></input><br></br>
                    <button>Submit</button>
                </label>
            </form>
            <Link to = "/">Back to Homepage</Link>
        </div>
    )
}

export default MealPlanForm;
