import React from "react";
import FIELDS from './formFields';
import { useSelector,useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import * as actions from '../../action';
const SurveyFormReview = ({ setReview }) => {
  const history=useHistory();
  const formValues = useSelector((state) => state.form.surveyForm.values);
  const dispatch=useDispatch();
  const handleSubmit =()=>{
      
  }
  return (
    <div className="container">
      <h5>{formValues && Object.keys(formValues).length===4?'Please confirm your entries!':'Looks like you missed some of the required field!'}</h5>
      {formValues && Object.keys(formValues).length===4 &&
      <div>
       { 
        FIELDS.map(field=>
          <div key={field.name}>
              <label>{field.label}</label>
              <div>{ formValues[field.name]}</div>
          </div>
        )
       }
      </div>
      }
      <button
        onClick={() => setReview(false)}
        className="yellow darken-3 white-text btn-flat"
      >
        Back
      </button>
      {formValues && Object.keys(formValues).length===4 &&
      <button onClick={()=>dispatch(actions.submitSurvey(formValues,history))
      } className="green white-text btn-flat right">Send Survey<i className="material-icons right">email</i></button>
      }
    </div>
  );
};
export default SurveyFormReview;
