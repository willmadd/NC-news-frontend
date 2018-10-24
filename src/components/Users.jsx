import React, { Component } from "react";
import * as api from "../api";
import Loader from "./Loader";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class Users extends Component {
  state = {
    user: {},
    error: null
  };

  componentDidMount = () => {
    api
      .getUserInfo(this.props.match.params.username)
      .then(res => {
        this.setState({
          user: res
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  };

  render() {
    if (this.state.error) {
      return (
        <Redirect
          to={{
            pathname: "/error",
            state: {
              message: this.state.error.message
            }
          }}
        />
      );
    }

    return (
      <div>
        {this.state.user && !this.state.user.username && <Loader />}
        {this.state.user && (
          <div>
            <h3> User Name: {this.state.user.username}</h3>
            <h3> Name: {this.state.user.name}</h3>
            <h3> id: {this.state.user._id}</h3>
            <img
              src={`${this.state.user.avatar_url}`}
              onError={img => {
                img.target.src = "/images/ncninja.svg";
              }}
              height="40"
              width="40"
              alt="Avatar for User"
            />
          </div>
        )}
      </div>
    );
  }
}


Users.propTypes = {
  match: PropTypes.object
};

export default Users;
