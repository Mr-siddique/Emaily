import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from "../action";
import { useDispatch } from "react-redux";
import Header from "./header";
import Landing from './landing'
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const App = () => {
  const dispatch=useDispatch();
  dispatch(actions.fetchUser())
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
