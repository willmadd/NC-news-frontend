import React from "react";
import "./Welcome.css";
import SignUp from "./SignUp";
import PropTypes from "prop-types";

const Welcome = props => {
  return (
    <div className="faderscreen">
      <div className="welcomeBox">
        <h1>{"Welcome, it looks like you're new to NorthCoders News<"}</h1>
        <p>{"you'll only see this once..."}</p>
        <h3>{"Please enter your details below if you'd like to sign up..."}</h3>
        <SignUp
          closeWelcome={props.closeWelcome}
          changeUser={props.changeUser}
          updateUsers={props.updateUsers}
        />
      </div>
    </div>
  );
};

Welcome.propTypes = {
  closeWelcome: PropTypes.func.isRequired,
  changeUser: PropTypes.func.isRequired,
  updateUsers: PropTypes.func.isRequired
};

export default Welcome;
