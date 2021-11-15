import React, { useState } from "react";
import {reduxForm} from 'redux-form';
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
const SurveyNew = () => {
  const [review, setReview] = useState(false);

  return (
    <div>
    {
    review?<SurveyFormReview setReview={setReview}/>:<SurveyForm setReview={setReview}/>
    }
    </div>
  );

};
export default reduxForm({
  form:'surveyForm'
})(SurveyNew);
