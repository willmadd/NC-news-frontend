import React, { Component } from "react";
import "./VoteControl.css";
import PropTypes from "prop-types";
import * as api from "../api";

class VoteControl extends Component {
  state = {
    voteModifier: 0
  };
  
  render() {
    return (
      <div className="voteControl">
        <button className={this.state.voteModifier ===1 ? "disabledButton voteImg":"voteImg"} onClick={() => this.changeVoteMod("up") }>
          <img src="/images/thumb-up-button.svg" height="20" alt="thumbs up" />
        </button>
        <p>{this.props.count + this.state.voteModifier}</p>
        <button
          className={this.state.voteModifier === -1 ? "disabledButton voteImg":"voteImg"}
          onClick={() => this.changeVoteMod("down")}
        >
          <img
            src="/images/thumb-down-button.svg"
            height="20"
            alt="thumbs down"
          />
        </button>
      </div>
    );
  }

  changeVoteMod = direction => {
    const newVotes = this.state.voteModifier + (direction === "up" ? 1 : -1);
    this.setState({
      voteModifier: newVotes
    });
        api.changeVote(direction, this.props.id)
  };
}

VoteControl.propTypes = {
  vote: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};

export default VoteControl;

