import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';
import '../../styling/SurveyNew.css';

function SurveyNew() {
    const [showFormReview, setShowReview] = useState(false);

    const renderContent = () => {
        if (showFormReview) {
            return (
                <SurveyFormReview onCancel={() => setShowReview(false)} />
            );
        }
        return (
            <SurveyForm onSurveySubmit={() => setShowReview(true)} />
        );
    };

    const instructions = () => {
        return (
            <h3>
                Please ask only one yes or no question in the email body<br />
                (Click above each line to fill. Multiple emails can be separated by commas.)
            </h3>
        )
    }

    return (
        <div className="surveynew-container">
            <div className="form-container">
                <h2>New Survey</h2>
                {showFormReview ? '' : instructions()}
                {renderContent()}
            </div>
        </div>
    );
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);