import React, { Component } from "react";

class Session extends Component {
  render() {
    let seconds =
      this.props.sessSeconds === 60 || this.props.sessSeconds === 0
        ? "00"
        : this.props.sessSeconds;
    let minutes = this.props.sessMinutes === 0 ? "00" : this.props.sessMinutes;
    return (
      <div className="session">
        <h3 id="timer-label">Session Time!</h3>
        <span id="time-left" className="time-left session-time-left">
          {minutes}:{seconds}
        </span>
      </div>
    );
  }
}

export default Session;
