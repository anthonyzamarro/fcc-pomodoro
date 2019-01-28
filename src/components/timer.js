import React, { Component } from "react";

class Timer extends Component {
  render() {
    let timeTitle = this.props.sessionMounted === true 
        ? 'Session' : 
        'Break';
    // let seconds =
    let seconds = this.props.timerSeconds;
    if (seconds < 10) {
      seconds = '0' + seconds;
    } else if (seconds === 60) {
      seconds = '00';
    }
    //   this.props.timerSeconds === 60 || this.props.timerSeconds === 0
    //     ? "00"
    //     : this.props.timerSeconds;
    let minutes = this.props.timerMinutes;
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
    return (
      <div className="timer">
        <h3 id="timer-label" className="tc timer-label">{timeTitle}</h3>
        <div id="time-left" className="tc time-left">{minutes}:{seconds}</div>
      </div>
    );
  }
}

export default Timer;
