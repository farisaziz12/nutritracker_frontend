import React, { Component } from 'react';

class ErrorMessage extends Component {
    render() {
        return (
            <h4 className="error-message">{this.props.errorMessage}</h4>
        );
    }
}

export default ErrorMessage;