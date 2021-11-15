import React from 'react';
const AllSurveys=({survey})=>{

    return (
     <div className="card">
         <div className="card-content">
         <span className="card-title">{survey.title}</span>
         <p>{survey.body}</p>
         <p className="right">Sent-On: {new Date(survey.dateSent).toLocaleDateString()}</p>
         
         {survey.lastResponded&&<p className="left">Last responded: {new Date(survey.lastResponded).toLocaleDateString()}</p>}

         </div>
         <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
         </div>
     </div>
    )
}
export default AllSurveys;