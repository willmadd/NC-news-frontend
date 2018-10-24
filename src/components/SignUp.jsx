import React, { Component } from "react";
import * as api from "../api";
import './SignUp.css';
import PropTypes from "prop-types";

class SignUp extends Component {
  state = {
    name: "",
    username: "",
    avatarurl: "",
    userNameAvailable: false,
    usernames:[],
    submit:false
  };

  componentDidMount = () => {
    api.getAllUsers()
    .then(res => {
        let userlist = res.map(user=>{
            return user.username.toLowerCase()
        })
        this.setState({
            usernames:userlist
        })
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="addUserForm">

      {this.state.name.length === 0 ? "Please Enter Your Name": this.state.username.length === 0? "Please Choose a User Name (must be unique)": !this.state.userNameAvailable? "username not available":this.state.avatarurl.length === 0?"Please Enter your Avatar URL":""}
            <input
              type="text"
              name="name"
              id="name"
              onChange={this.handleChange}
              placeholder="Name"
              className="newUserInput"
            />
            <input
              type="text"
              name="username"
              id="username"
              onChange={this.handleChange}
              placeholder="User Name"
              className="newUserInput"
            />
            <input
              type="text"
              name="avatarurl"
              id="url"
              onChange={this.handleChange}
              placeholder="Avatar URL"
              className="newUserInput"
            />
              <div className="buttonHolder">
              <button className="signupbutton" id={this.state.submit?"submitButton":"disabledSubmitButton"} onClick={this.handleSubmit}>Sign Me Up!</button>
              <button className="signupbutton" id="cancelButton" onClick={this.props.closeWelcome}>{"I'll Sign Up Later!"}</button>
              </div>
        </form>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      username: this.state.username,
      avatar_url: this.state.avatarurl
    };
    api.addUser(newUser)
    .then(user=>{
this.props.updateUsers(user);
      this.props.changeUser(user._id);
      this.props.closeWelcome();
    })
  };

  handleChange = event => {
    let userNameAvailable = false;
    if (!this.state.usernames.includes(event.target.value.toLowerCase()) && (event.target.value)) {
      userNameAvailable = true;
    }

    this.setState(
      {
      [event.target.name]: event.target.value,
      userNameAvailable,
    },
    ()=>{
      let submit = false
      if(userNameAvailable===true && this.state.name.length > 0 && this.state.username.length > 0 && this.state.avatarurl.length>0){
        submit = true
      }
      this.setState({
        submit
      })
    }
    );

  };
}

SignUp.propTypes = {
  closeWelcome: PropTypes.func.isRequired,
  changeUser: PropTypes.func.isRequired,
  updateUsers: PropTypes.func.isRequired
};



export default SignUp;
