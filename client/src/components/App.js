import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from "../action";
import { useDispatch } from "react-redux";
import Header from "./header";
import Landing from './landing'
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";


const App = () => {
  const dispatch=useDispatch();
  dispatch(actions.fetchUser());
  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route exact path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};
export default App;
