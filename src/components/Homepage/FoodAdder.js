import React, { Component } from 'react';

class FoodAdder extends Component {
    state = {
        mealName: "",
        name: ""
    }

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    SubmitHandler = (e) => {
        e.preventDefault()
        this.props.foodHandler(this.state)
        this.setState({
            mealName: "",
            name: ""
        })
    }

    render() {
        return (
            <form onChange={this.inputChangeHandler} onSubmit={this.SubmitHandler}>
                <h3>Meal Name: </h3>
                <input type = "text" onChange = {() => 0} value = {this.state.mealName} name = "mealName"></input>
                <h3>Input Food:</h3>
                <input onChange = {() => 0} value={this.state.name} name="name" type="text" placeholder="food"/>
                <button onChange =  {() => 0} className="add-button">Add</button>
            </form>
        );
    }
}

export default FoodAdder;
