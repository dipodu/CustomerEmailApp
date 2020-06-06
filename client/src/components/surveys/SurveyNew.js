import React, { Component } from "react";
import SurveyFormReview from "./surveyFormReview";
import SurveyForm from "./surveyForm";
import { reduxForm } from "redux-form";

//Decides whether to show Survey Or Survey Review
class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
