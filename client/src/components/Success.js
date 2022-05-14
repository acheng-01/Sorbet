import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
//import { addCredits } from '../actions';
import '../styling/Success.css';

function Success(props) {
    //const history = useNavigate();

    return (
        <div className="success-container">
            <h2>Success!</h2>
            <h3>5 credits have been added to your account!</h3>
            <Link to="/surveys">
                <button className="dashboard-return">
                    Return to dashboard
                </button>
            </Link>
        </div>
    );
};

export default Success;