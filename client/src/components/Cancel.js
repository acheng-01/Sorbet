import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Cancel.css';

function Cancel() {
    return (
        <div className="cancel-container">
            <h2>Your payment was canceled.</h2>
            <Link to="/surveys">
                <button className="dashboard-return">
                    Return to dashboard
                </button>
            </Link>
        </div>
    );
};

export default Cancel;