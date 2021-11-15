import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';
import _ from 'lodash';
import FIELDS from './formFields';
const SurveyForm = (props) => {
  const RenderFields = () => {
    return _.map(FIELDS,(field, index) => (
      <Field
        label={field.label}
        type="text"
        name={field.name}
        component={SurveyField}
        key={index}
      />
    ));
  };
  return (
    <div>
      <form onSubmit={props.handleSubmit(()=>props.setReview(true))}>
        <RenderFields />
        <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next<i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
}
//implemented later
function validate(values) {
  const errors={};
  _.each(FIELDS,({name})=>{
    if(!values[name])
      errors[name]=`You must provide a value`;
  })
  if(values.emails){
  const regex= /\S+@\S+\.\S+/;
  const invalidEmails=values.recipients.split(',').map(recipient=>recipient.trim()).filter(recipient=> !regex.test(recipient));
  if(invalidEmails.length)
  errors.recipient=`Invalid Emails ${invalidEmails}`;
  }
  return errors;
}
export default reduxForm({
  form: "surveyForm",
  destroyOnUnmount:false
})(SurveyForm);
