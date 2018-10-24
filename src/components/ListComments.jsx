import React, { Component } from "react";
import * as api from "../api";
import PropTypes from "prop-types";
import SubmittedBy from "./SubmittedBy";
import Loader from "./Loader";
import CommentAdder from "./CommentAdder";
import sortBy from "lodash.sortby";
import moment from "moment";
import VoteControl from "./VoteControl";
import "./ListComments.css";
import { Link } from "react-router-dom";

class ListComments extends Component {
  state = {
    comments: [],
    finishedLoading: false
  };

  componentDidMount = () => {
    this.fetchComments();
  };

  render() {
    return (
      <div>
        <h3>Comments - You can only delete your own comments</h3>
        <CommentAdder
          updateComments={this.updateComments}
          articleid={this.props.articleid}
          user={this.props.user}
        />
        {this.state.finishedLoading &&
          !this.state.comments.length && <p>{"There's nothing here..."}</p>}
        {this.state.finishedLoading ? (
          <div>
            <ul className="commentList">
              {sortBy([...this.state.comments], comment => {
                return new moment(comment.created_at);
              })
                .reverse()
                .map(comment => {
                  return (
                    <li key={comment._id} className="commentListItem">
                      <Link to={`/users/${comment.created_by.username}`}>
                        <img
                          className="avatar"
                          src={comment.created_by.avatar_url}
                          onError={img => {
                            img.target.src = "/images/ncninja.svg";
                          }}
                          alt="avatar"
                        />
                      </Link>
                      <p>{comment.body}</p>
                      <SubmittedBy
                        username={comment.created_by.username}
                        created_at={comment.created_at}
                      />
                      {comment.created_by._id === this.props.user && (
                        <button
                          className="deleteButton"
                          onClick={() => this.deleteComment(comment._id)}
                        />
                      )}
                      <VoteControl
                        count={comment.votes}
                        vote={this.voteComment}
                        id={comment._id}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }

  fetchComments = () => {
    api
      .getCommentsByArticleId(this.props.articleid)
      .then(comments => {
        if (!comments) comments = [];
        this.setState({
          comments,
          finishedLoading: true
        });
      })
      .catch(() => {
        this.setState({
          finishedLoading: true
        });
      });
  };

  updateComments = newComment => {
    let newComments = [...this.state.comments, newComment];
    this.setState({
      comments: newComments
    });
  };

  deleteComment = id => {
    api.deleteComment(id).then(res => {
      let newComments = [...this.state.comments].filter(comment => {
        return comment._id !== res.deletedComment._id;
      });

      this.setState({
        comments: newComments
      });
    });
  };

  voteComment = (direction, id) => {
    api.changeCommentVote(direction, id).then(res => {
      let newComments = [...this.state.comments].map(comment => {
        if (res.comment._id === comment._id) {
          return res.comment;
        }
        return comment;
      });
      this.setState({
        comments: newComments
      });
    });
  };
}

ListComments.propTypes = {
  articleid: PropTypes.string.isRequired,
  user: PropTypes.string
};

export default ListComments;
