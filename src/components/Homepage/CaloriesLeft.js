import React, { Component } from 'react';

class CaloriesLeft extends Component {
    state = {  }
    render() {
        return (
            <h1>Calories Left: {this.props.calorieLimit - this.props.caloriesConsumed}</h1>
        );
    }
}

export default CaloriesLeft;