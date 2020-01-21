import React, { Component } from 'react'
import './css/homepage.css';

class LogoutButton extends Component {
    state = { fixed: false }
    render() {
        const { fixed } = this.state
        return (
                <button className="button" onClick = {this.props.logout}> Log out</button>
            
        );
    }
}

export default LogoutButton;
