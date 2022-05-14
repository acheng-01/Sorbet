import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import SurveyList from './surveys/SurveyList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styling/Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard-container">
            <SurveyList />
            <div className="fixed-action-btn">
                <Link to="/surveys/new" data-tip data-for="add-survey">
                    <button className="add-survey-btn">
                        <FontAwesomeIcon icon={faPlus} />
                        <ReactTooltip place="top" id="add-survey" effect="solid">New Survey</ReactTooltip>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;