import React,{useState} from "react";
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import AllSurveys from './surveys/AllSurveys'
import {fetchSurveys} from '../action';
const Dashboard = () => {
  const dispatch = useDispatch();
  dispatch(fetchSurveys());
  const surveys=useSelector(state=>state.surveys);
  surveys.reverse();
  return (
    <div>
      {
        surveys.map((survey,index)=><AllSurveys survey={survey} key={index}/>)
      }
      <div className="fixed-action-btn">
        <Link to='/surveys/new' className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};
export default Dashboard;
