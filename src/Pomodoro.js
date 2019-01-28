import React, { Component } from "react";
import Timer from "./components/timer.js";
import alarm from "./audio/alarm.mp3";

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      startStop: false,
      sessionMounted: true,
      timeMinutes: 25,
      timeSeconds: 60,
      subOne: 0
    };
    this.startStopTimer = this.startStopTimer.bind(this);
  }
  componentDidMount() {
    //set initialState so we can reset if needed
    this.initialState = this.state;
    this.promise = document.querySelector("#beep"); 
  }
  handleSessionLengthDecrement = () => {
    if (this.state.startStop === false) {
      if (this.state.sessionMounted) {
        this.setState({
          timeMinutes: this.state.timeMinutes - 1
        });
      }
      this.setState({
        sessionLength: this.state.sessionLength - 1
      });
      if (this.state.sessionLength <= 1) this.setState({ sessionLength: 1 });
      if (this.state.timeMinutes <= 1) this.setState({ timeMinutes: 1 });
    }
  };
  handleSessionLengthIncrement = () => {
    if (this.state.startStop === false) {
      if (this.state.sessionMounted) {
        this.setState({
          timeMinutes: this.state.timeMinutes + 1
        });
      }
      this.setState({
        sessionLength: this.state.sessionLength + 1
      });
      if (this.state.sessionLength >= 60) this.setState({ sessionLength: 60 });
    }
  };
  handleBreakLengthDecrement = () => {
    if (this.state.startStop === false) {
      this.setState({
        breakLength: this.state.breakLength - 1
      });
      if (this.state.breakLength <= 1) this.setState({ breakLength: 1 });
    }
  };
  handleBreakLengthIncrement = () => {
    if (this.state.startStop === false) {
      this.setState({
        breakLength: this.state.breakLength + 1
      });
      if (this.state.breakLength >= 60) this.setState({ breakLength: 60 });
    }
  };
  // use async/await to update state immediately
  handleStartStop = async () => {
    await this.setState(prevState => ({
      startStop: !prevState.startStop
    }));
    // start session
    if (this.state.startStop) {
      this.startStopTimer();
    } else {
    // pause session
      clearInterval(this.timeIntervalId);
    }
  };
  handleReset = () => {
    clearInterval(this.timeIntervalId);
    this.setState({ ...this.initialState });
    this.promise.pause();
    this.promise.currentTime = 0;
  };
  playAudio = () => {
    this.promise.play();
    // flip timer state
    this.setState(prevState => ({
      sessionMounted: !prevState.sessionMounted,
    }));
    //use setTimeout to only play audio for 2 seconds
    setTimeout(() => {
      this.promise.pause();
      // reset respective timers to state user set
      const initialSessionMinutes = this.state.sessionLength;
      const initialBreakMinutes = this.state.breakLength;
      if (this.state.sessionMounted) {
        this.setState({
          timeMinutes: initialSessionMinutes,
          timeSeconds: 60,
          subOne: 0
        });
        this.startStopTimer();
      } else {
        this.setState({
          timeMinutes: initialBreakMinutes,
          timeSeconds: 60,
          subOne: 0
        });
        this.startStopTimer();
      }
      this.promise.currentTime = 0;
    }, 2000);
  };
  startStopTimer = () => {
    this.timeIntervalId = setInterval(() => {
      if (this.state.subOne <= 0) {
        this.setState({
          timeMinutes: this.state.timeMinutes - 1,
          subOne: 1
        })
      }
      this.setState({
        timeSeconds: this.state.timeSeconds - 1
      });
      // seconds === 0, but minutes !== 0, subtract 1 from minutes and reset seconds
      if (this.state.timeSeconds === 0 && this.state.timeMinutes !== 0) {
        this.setState({
          timeMinutes: this.state.timeMinutes - 1,
          timeSeconds: 60
        });
      }
      //both minutes and seconds === 0, then clear
      if (this.state.timeSeconds === 0 && this.state.timeMinutes === 0) {
        clearInterval(this.timeIntervalId);
        this.playAudio();
      }
    }, 1000);
  };
  render() {
    return (
      <div className="pomodoro">
        <div className="b-di">
          <h3 id="break-label" className="label-b-di">Break Length</h3>
          <div className="di-container-inner">
            <div id="break-decrement" className="di b-di-1" onClick={this.handleBreakLengthDecrement}>
              ↓
            </div>
            <div id="break-increment" className="di b-di-2" onClick={this.handleBreakLengthIncrement}>
              ↑
            </div>
          </div>
          <div id="break-length" className="di-num num-b-di">{this.state.breakLength}</div>
        </div>
        <div className="s-di">
          <h3 id="session-label" className="label-s-di">Session Length</h3>
          <div className="di-container-inner">
            <div id="session-decrement" className="di s-di-1" onClick={this.handleSessionLengthDecrement}>
              ↓
            </div>
            <div id="session-increment" className="di s-di-2" onClick={this.handleSessionLengthIncrement}>
              ↑
            </div>
          </div>
          <div id="session-length" className="di-num num-s-di">{this.state.sessionLength}</div>
        </div>
        <Timer
          startTime={this.startStopTimer}
          timerMinutes={this.state.timeMinutes}
          timerSeconds={this.state.timeSeconds}
          sessionMounted={this.state.sessionMounted}
        />
        <div className="spr">
          <div id="start_stop" className="start-stop" onClick={this.handleStartStop}>
          Start/Pause
          </div>
          <div id="reset" className="reset" onClick={this.handleReset}>
            Reset
          </div>
        </div>
        <audio src={alarm} id="beep" />
      </div>
    );
  }
}
export default Pomodoro;
