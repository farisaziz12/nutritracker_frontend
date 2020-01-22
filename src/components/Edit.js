import React, { Component } from 'react';
import API from '../API'
import {Redirect} from 'react-router-dom';

class Edit extends Component {

    state = {
        weight: this.props.user.weight, 
        height: this.props.user.height, 
        age: this.props.user.age, 
        calorieLimit: this.props.user.calorieLimit,
        redirect: false
    }

    editState = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    
    
    handleEditSumit = e => {
        e.preventDefault()
        API.editUser({
            weight: this.state.weight, 
            height: this.state.height, 
            age: this.state.age,
            calorieLimit: this.state.calorieLimit
        }).then(resp => resp.json()).then(user => this.props.setUser(user))
        this.setState({
            redirect: true
        })
    } 



    render() {

        return (
            <>
                <h1>Edit Info</h1>
                <form onSubmit={this.handleEditSumit}> 
                    <h2>Weight (kg)</h2>
                    <input onChange={this.editState} className="edit-input" type="number" name="weight" value={this.state.weight}/><br/>
                    <h2>Height (cm)</h2>
                    <input onChange={this.editState} type="number" name="height" value={this.state.height}/><br/>
                    <h2>Calorie Limit</h2>
                    <input onChange={this.editState} type="number" name="calorieLimit" value={this.state.calorieLimit}/><br/>
                    <h2>Age</h2>
                    <input onChange={this.editState} type="number" name="age" value={this.state.age}/><br/>
                    <button>Submit</button>
                </form>
            {this.state.redirect&& <Redirect to='/'/> }
            </>
        );
    }
}

export default Edit;
