import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions';
import { useNavigate } from 'react-router-dom';
import '../../styling/SurveyFormReview.css';

function SurveyFormReview({ onCancel, formValues, submitSurvey }) {
    const history = useNavigate();

    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name} className="field-container-2">
                <label>{label}</label>
                <div className="entry">
                    {formValues[name]}
                </div>
            </div>
        );
    });
    
    return (
        <div className="form-review-container">
            <h5>Please confirm your entries</h5>
            <div className="review-fields">
                {reviewFields}    
            </div>
            <div className="action-btns">
                <button
                    className="return-btn"
                    onClick={onCancel}
                >
                    Back
                </button>
                <button
                    onClick={() => submitSurvey(formValues, history)}
                    className="proceed-btn"
                >
                    Send Survey
                </button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);