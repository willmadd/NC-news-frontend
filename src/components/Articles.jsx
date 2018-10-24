import React, { Component } from "react";
import "./Articles.css";
import moment from "moment";
import * as api from "../api";
import sortBy from "lodash.sortby";
import VoteControl from "./VoteControl";
import { Link, Redirect } from "react-router-dom";
import Topicheader from "./Topicheader";
import SubmittedBy from "./SubmittedBy";
import Loader from "./Loader";
import ArticleAdder from "./ArticleAdder";
import PropTypes from "prop-types";

class Articles extends Component {
  state = {
    articles: [],
    error: null,
    showAddArticle: false
  };

  componentDidMount = () => {
    this.getArticles(this.props.match.params.topic_slug);
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.match.params.topic_slug !== this.props.match.params.topic_slug
    ) {
      this.getArticles(this.props.match.params.topic_slug);
    }
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
      <div className="bodycontent">
        {!this.state.articles[0] && <Loader />}
        {this.props.match.params.topic_slug && 
          <div>
                          <div className="logInContainer">

<Topicheader text={`${this.state.articles.length} articles about ${this.props.match.params.topic_slug}`}/>
</div>
            {(this.props.user ? (
              <div className="logInContainer">
                <button
                  className="addArticlesButton"
                  onClick={this.showAddArticle}
                >
                  Add an Article
                </button>
              </div>
            ) : (
              <div className="logInContainer">
                <button className="addArticlesButtonDisabled">
                  Log in to post an article
                </button>
              </div>
            ))}
          </div>
        }

        {this.state.showAddArticle &&
          this.props.user && (
            <ArticleAdder
              topic={this.props.match.params.topic_slug}
              addArticle={this.addArticle}
              user={this.props.user}
              cancel={this.showAddArticle}
            />
          )}
        <ul className="articleUL">
          {sortBy([...this.state.articles], article => {
            return new moment(article.created_at);
          })
            .reverse()
            .map(article => {
              return (
                <li key={article._id} className="articleCard">
                  <Link to={`/articles/${article._id}`}>
                    <img
                      className="articleCardImage"
                      src={`/images/topics/${article.belongs_to}/${Math.floor(
                        Math.random() * 9
                      ) + 1}.jpg`}
                      alt="title"
                      height="200"
                    />
                  </Link>
                  <Link to={`/topics/${article.belongs_to}`}>
                    <Topicheader text={article.belongs_to} />
                  </Link>
                  <Link to={`/articles/${article._id}`}>
                    <h3>{article.title}</h3>

                    <p>
                      {article.body
                        .split(" ")
                        .slice(0, 15)
                        .join(" ")}
                      {article.body.split(" ")[16] && "..."}
                    </p>
                  </Link>
                  <SubmittedBy
                    userid={article.created_by._id}
                    created_at={article.created_at}
                    username={article.created_by.username}
                  />
                  <hr />
                  <div className="articleInteractive">
                    <p className="commentCount">{article.comment}</p>
                    <VoteControl
                      count={article.votes}
                      vote={this.voteArticle}
                      id={article._id}
                    />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }

  voteArticle = (direction, id) => {
    api.changeVote(direction, id).then(res => {
      const newState = [...this.state.articles].map(article => {
        if (article._id === res._id) {
          return {
            ...res,
            comment: article.comment
          };
        }
        return article;
      });
      this.setState({
        articles: newState
      });
    });
  };

  getArticles = topic => {
    if (topic) {
      api
        .getArticlesByTopic(topic)
        .then(articles => {
          this.setState({
            articles
          });
        })
        .catch(error => {
          this.setState({
            error
          });
        });
    } else {
      api
        .getAllArticles()
        .then(articles => {
          this.setState({
            articles
          });
        })
        .catch(error => {
          this.setState({
            error
          });
        });
    }
  };

  addArticle = newArticle => {
    const newArticles = [...this.state.articles, newArticle.article];
    this.setState({
      articles: newArticles
    });
  };

  showAddArticle = () => {
    this.setState({
      showAddArticle: !this.state.showAddArticle
    });
  };
}

Articles.propTypes = {
  user: PropTypes.string,
  match: PropTypes.object
};

export default Articles;
