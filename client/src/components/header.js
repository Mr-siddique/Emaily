import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backendURL } from "../url";
import Payments from "./payments";

const Header = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={state ? "/surveys  " : "/"} className="left brand-logo">
          Emaily
        </Link>
        {state !== null && (
          <ul className="right">
            {state === false ? (
              <li>
                <a href={backendURL + "/auth/google"}>Login with Google!</a>
              </li>
            ) : (
              [
                <li key="1">
                  <Payments />
                </li>,
                <li key="2" style={{ margin: "0px 10px" }}>
                  Credits: {state.credits}
                </li>,
                <li key="3">
                  <a href={backendURL + "/api/logout"}>Logout</a>
                </li>,
              ]
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};
export default Header;
