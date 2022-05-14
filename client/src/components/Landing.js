import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import '../styling/Landing.css';

function Landing(props) {
    if (props.auth) {
        return <Navigate to="/surveys" />
    }

    return (
        <div className="landing-container">
            <h1>Sorbet!</h1>
            <h2>Create survey. Email. Collect feedback.</h2>
            <h3>Log in to begin</h3>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Landing);