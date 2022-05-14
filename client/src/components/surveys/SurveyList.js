import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import '../../styling/SurveyList.css';

function SurveyList(props) {
    useEffect(() => {
        props.fetchSurveys();
    }, [])

    const handleDelete = (_id, e) => {
        e.preventDefault();
        props.deleteSurvey(_id);
    }

    const renderGreeting = () => {
        return (
            <div className="greeting">
                <h2>Hi, let's get you started!</h2>
                <h3>
                    Before any emails can be sent, you must add credits to your account.<br/>
                    Each survey sent, regardless of the number of recipients, will take 1 credit.<br/>
                    You can add and keep track of your credits in the right side of the header.
                </h3>
                <h3>
                    You can click on the add icon at the bottom right corner of this page to start a new survey.
                </h3>
                <h3>
                    Good luck!
                </h3>
            </div>
        )
    };

    const renderWrapper = () => {
        return (
            <div className="dashboard-greeting">
                <h2>Dashboard</h2>
                {renderSurveys()}
            </div>
        );
    };

    const renderSurveys = () => {
        return props.surveys.reverse().map(({ _id, title, body, dateSent, yes, no }) => {
            return (
                <div className="content-container" key={_id}>
                    <div className="card-content">
                        <span className="card-title">{title}</span>
                        <p className="card-body">
                            {body}
                        </p>
                        <p className="date-sent">
                            Sent On: {new Date(dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="bottom-info">
                        <div className="card-action">
                            <a>Yes: {yes}</a>
                            <a>No: {no}</a>
                        </div>
                        <button className="delete" onClick={e => handleDelete(_id, e)} data-tip data-for="delete">
                            <FontAwesomeIcon icon={faTrashCan} />
                            <ReactTooltip place="bottom" effect="solid" id="delete">Delete</ReactTooltip>
                        </button>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className="surveylist-container">
            {props.surveys.length === 0 ? renderGreeting() : renderWrapper()}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        surveys: state.surveys
    };
}

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList);