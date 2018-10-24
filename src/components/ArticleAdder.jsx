import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import "./ArticleAdder.css";

class ArticleAdder extends Component {
  state = {
    title: "",
    body: ""
  };
  render() {
    return (
      <div>
        <div className="faderscreen">
          <div className="addArticleBox">
            {this.props.user && (
              <div >
                <h1>Add an Article...</h1>
                <form onSubmit={this.handleSubmit} className="addArticlesContainer">
                  <label>
                    Title:
                    <input
                      type="textarea"
                      id="titleInput"
                      name="title"
                      onChange={this.handleChange}
                      value={this.state.title}
                    />
                  </label>
                  <label>
                    Article:
                    <textarea
                      type="textarea"
                      cols="50"
                      rows="10"
                      id="bodyInput"
                      name="body"
                      onChange={this.handleChange}
                      value={this.state.body}
                    />
                  </label>
                  <div className="buttonHolder">
                  <input className= "addArticleButton" id="submitButton" type="submit" />
                  <button className= "addArticleButton" id="cancelButton" onClick={this.props.cancel}>Cancel</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };


  handleSubmit = event => {
    event.preventDefault();
    let newArticleBody = {
      title: this.state.title,
      body: this.state.body,
      created_by: this.props.user
    };

    api.postArticle(newArticleBody, this.props.topic).then(res => {
      res.article.comment=0
      this.props.addArticle(res);
    });

    this.setState({
      body: "",
      title: ""
    });
    this.props.cancel();
  };
}

ArticleAdder.propTypes = {
  topic: PropTypes.string.isRequired,
  addArticle: PropTypes.func.isRequired,
  user: PropTypes.string,
  cancel: PropTypes.func
};

export default ArticleAdder;
