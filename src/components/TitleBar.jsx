import React from "react";
import "./TitleBar.css";
import { Link } from "react-router-dom";

const TitleBar = () => {
  return (
    <div className="titleBar">
      <h1>NorthCoders News</h1>
      <Link to="/">
        <img
          src="/images/404monster.svg"
          className="ncninja"
          alt="user avatar"
        />
      </Link>
    </div>
  );
};
export default TitleBar;
