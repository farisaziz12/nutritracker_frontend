import React, { Component } from 'react';

class FoodAdder extends Component {
    state = {
        food: ""
    }

    inputChangeHandler = e => {
        this.setState({
            food: e.target.value
        })
    }

    SubmitHandler = (e) => {
        e.preventDefault()
        this.props.foodHandler(this.state.food)
        this.setState({
            food: ""
        })
    }

    render() {
        return (
            <form onChange={this.inputChangeHandler} onSubmit={this.SubmitHandler}>
                <h3>Input Food:</h3>
                <input value={this.state.food} name="food" type="text" placeholder="food"/>
                <button className="add-button">Add</button>
            </form>
        );
    }
}

export default FoodAdder;