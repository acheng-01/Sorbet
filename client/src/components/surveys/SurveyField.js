import React from 'react';
import '../../styling/SurveyField.css';

export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div className="field-container">
            <label>{label}</label>
            <input {...input} />
            <div className="error-message">
                {touched && error}
            </div>
        </div>
    )
}