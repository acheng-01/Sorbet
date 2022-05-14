import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
import '../../styling/SurveyForm.css';

class SurveyForm extends React.Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        })
    }

    render() {
        return (
            <div className="surveyform-container">
                <form
                    onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
                    className="entries-unconfirmed"
                >
                    {this.renderFields()}
                    <div className="action-btns">
                        <Link to="/surveys">
                            <button className="return-btn">
                                Cancel
                            </button>
                        </Link>
                        <button className="proceed-btn" type="submit">
                            Next
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.emails = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = `Please provide ${name}!`
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);