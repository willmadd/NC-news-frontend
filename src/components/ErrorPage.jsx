import React from "react";
import "./ErrorPage.css";
import PropTypes from "prop-types";

const ErrorPage = props => {
  return (
    <div className="errorBody">
      <div className="errorContainer">
        <div className="monsterMessage">
          <h1>Something bad happened</h1>
          <h2>
            {props.location.state
              ? props.location.state.message
              : "That Page Doesn't Exist"}
          </h2>
          <p>You probably entered the web address incorrectly</p>
        </div>
        <div className="monster" />
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
    location: PropTypes.object,
  };
  

export default ErrorPage;
