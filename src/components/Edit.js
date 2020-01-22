import React, { Component } from 'react';
import API from '../API'
import {Redirect} from 'react-router-dom';

class Edit extends Component {

    state = {
        weight: undefined, 
        height: undefined, 
        age: undefined, 
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
            age: this.state.age
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
                    <h2>Weight (KG)</h2>
                    <input onChange={this.editState} className="edit-input" type="number" name="weight" placeholder={this.props.user.weight}/><br/>
                    <h2>Height (CM)</h2>
                    <input onChange={this.editState} type="number" name="height" placeholder={this.props.user.height}/><br/>
                    <h2>Age</h2>
                    <input onChange={this.editState} type="number" name="age" placeholder={this.props.user.age}/><br/>
                    <button>Submit</button>
                </form>
            {this.state.redirect&&
            <Redirect to='/'/>
            }
            </>
        );
    }
}

export default Edit;