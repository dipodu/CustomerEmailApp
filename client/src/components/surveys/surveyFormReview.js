import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, (field) => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h4>Final Review</h4>
      {reviewFields}
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        <i className="material-icons">arrow_back</i>
      </button>

      <button
        type="submit"
        className="teal btn-flat right white-text"
        onClick={() => submitSurvey(formValues, history)}
      >
        <i className="material-icons right">send</i>
        SEND
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
