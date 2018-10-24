import { Link } from "react-router-dom";
import * as api from "../api";
import React, { Component } from "react";
import Welcome from "./Welcome";
import PropTypes from "prop-types";
import UserLoginBox from './UserLoginBox';

class Menu extends Component {
  state = {
    users: [],
    topics: [],
    showSignUp: false,
    currentUser: null
  };

  componentDidMount = () => {
    this.getTopics();
    this.getUsers();
    let visited = localStorage["alreadyVisited"];
    if (visited) {
      this.setState({
        showSignUp: false
      });
    } else {
      localStorage["alreadyVisited"] = true;
      this.setState({
        showSignUp: true
      });
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.user !== this.props.user) {
      this.getCurrentUser();
    }
  };

  render() {
    return (
      <div className="mainNav">
        {this.state.showSignUp && (
          <Welcome
            closeWelcome={() => this.showSignUp()}
            updateUsers={this.updateUsers}
            changeUser={this.props.changeUser}
          />
        )}

        <nav>
          <ul>
            <Link to="/">
              <li className="menuItem">Home</li>
            </Link>
            <li className="menuItem">
              <a>Topics</a>
              <ul className="dropdown">
                {this.state.topics.map(topic => {
                  return (
                    <Link to={`/topics/${topic.slug}`} key={topic._id}>
                      <li className="dropDownItem">{topic.title}</li>
                    </Link>
                  );
                })}
              </ul>
            </li>

            <li id="signupbutton" className="menuItem">
              <button onClick={() => this.showSignUp()}>Sign Up</button>
            </li>
            <UserLoginBox user={this.state.user} users={this.state.users} changeUser={this.props.changeUser}/>

          </ul>
        </nav>
      </div>
    );
  }

  getTopics = () => {
    api.getTopics().then(topics => {
      this.setState({
        topics
      });
    });
  };

  getUsers = () => {
    api.getAllUsers().then(users => {
      this.setState({
        users
      });
    });
  };

  showSignUp = () => {
    this.setState({
      showSignUp: !this.state.showSignUp
    });
  };

  updateUsers = newUser => {
    let users = [...this.state.users, newUser];
    this.setState({
      users
    });
  };

  getCurrentUser = () => {
    let user = this.state.users.find(user => user._id === this.props.user);
    this.setState({
      user: user.username
    });
  };
}

Menu.propTypes = {
  changeUser: PropTypes.func,
  user: PropTypes.string
};

export default Menu;
