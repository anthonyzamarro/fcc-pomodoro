import React, { Component } from "react";

class Break extends Component {
  render() {
    let seconds =
      this.props.brkSeconds === 60 || this.props.brkSeconds === 0
        ? "00"
        : this.props.brkSeconds;
    let minutes = this.props.brkMinutes === 0 ? "00" : this.props.brkMinutes;
    return (
      <div className="break">
        <h3 id="break-label">Break Time!</h3>
        <span id="time-left" className="time-left break-time-left">
          {minutes}:{seconds}
        </span>
      </div>
    );
  }
}

/*
  if Break component is mounted and startStop
  button is clicked, then pause timer. The
  compoent MUST be mounted.
*/

export default Break;
