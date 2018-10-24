import React, { Component } from "react";
import * as api from "../api";
import PropTypes from "prop-types";

class CommentAdder extends Component {
  state = {
    body: "",
    user: ""
  };
  render() {
    return (
      <div>
          {this.props.user? 
            <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.body}
            />
            <button value="submit">Submit</button>
          </form>
            : "Log in to leave a comment..."}
        
      </div>
    );
  }

  handleChange = event => {
    this.setState({
      body: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    let newComment = {
      body: this.state.body,
      created_by: this.props.user
    };
    api.postComment(newComment, this.props.articleid).then(res => {
      this.props.updateComments(res.comment);
    });

    this.setState({
      body: ""
    });
  };
}

CommentAdder.propTypes = {
  updateComments: PropTypes.func.isRequired,
  articleid: PropTypes.string.isRequired,
  user: PropTypes.string,
};

export default CommentAdder;
