import React, { Component } from "react";
import Break from "./components/break.js";
import Session from "./components/session.js";
import alarm from "./audio/alarm.mp3";

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakSeconds: 60,
      breakMinutes: 1,
      breakLength: 5,
      breakMounted: false,
      sessionMinutes: 1,
      sessionLength: 25,
      sessionSeconds: 60,
      startStop: false,
      pauseBreak: false,
      startMounted: true,
      triggerAudio: false
    };
    this.startStopSession = this.startStopSession.bind(this);
  }
  componentDidMount() {
    //set initialState so we can reset if needed
    this.initialState = this.state;
  }
  handleSessionDecrement = () => {
    this.setState({
      sessionMinutes: this.state.sessionMinutes - 1
    });
    if (this.state.sessionMinutes <= 1) this.setState({ sessionMinutes: 1 });
  };
  handleSessionLengthDecrement = () => {
    this.setState({
      sessionLength: this.state.sessionLength - 1
    });
    this.handleSessionDecrement();
    if (this.state.sessionLength <= 1) this.setState({ sessionLength: 1 });
  };
  handleSessionIncrement = () => {
    this.setState({
      sessionMinutes: this.state.sessionMinutes + 1
    });
    if (this.state.sessionMinutes >= 60) this.setState({ sessionMinutes: 60 });
  };
  handleSessionLengthIncrement = () => {
    this.setState({
      sessionLength: this.state.sessionLength + 1
    });
    this.handleSessionIncrement();
    if (this.state.sessionLength >= 60) this.setState({ sessionLength: 60 });
  };
  handleBreakDecrement = () => {
    this.setState({
      breakMinutes: this.state.breakMinutes - 1
    });
    if (this.state.breakMinutes <= 1) this.setState({ breakMinutes: 1 });
  };
  handleBreakLengthDecrement = () => {
    this.setState({
      breakLength: this.state.breakLength - 1
    });
    this.handleBreakDecrement();
    if (this.state.breakLength <= 1) this.setState({ breakLength: 1 });
  };
  handleBreakIncrement = () => {
    this.setState({
      breakMinutes: this.state.breakMinutes + 1
    });
    if (this.state.breakMinutes > 60) this.setState({ breakMinutes: 60 });
  };
  handleBreakLengthIncrement = () => {
    this.setState({
      breakLength: this.state.breakLength + 1
    });
    this.handleBreakIncrement();
    if (this.state.breakLength >= 60) this.setState({ breakLength: 60 });
  };
  // use async/await to update state immediately
  handleStartStop = async () => {
    await this.setState(prevState => ({
      startStop: !prevState.startStop
    }));
    // start session
    if (this.state.startStop) {
      this.startStopSession();
    } else {
      // pause session
      clearInterval(this.sessionIntervalId);
    }
  };
  // use async/await to update state immediately
  pause = async () => {
    await this.setState(prevState => ({
      pauseBreak: !prevState.pauseBreak
    }));
    // pause
    if (this.state.pauseBreak) {
      clearInterval(this.breakIntervalId);
    } else {
      // resume
      this.startStopBreak();
    }
  };
  handleReset = () => {
    clearInterval(this.sessionIntervalId);
    clearInterval(this.breakIntervalId);
    this.setState({ ...this.initialState });
  };
  playAudio = () => {
    if (this.state.triggerAudio) {
      this.promise = document.querySelector("#beep");
      this.promise.play();
      setTimeout(() => {
        this.promise.pause();
        this.setState(prevState => ({
          breakMounted: !prevState.breakMounted,
          startMounted: !prevState.startMounted,
        }));
        if (this.state.breakMounted) {
          this.startStopBreak();
        } else if (this.state.startMounted) {
          this.startStopSession();
        }
      }, 2000);
      this.promise.currentTime = 0;
    //   if (this.promise !== undefined) {
    //     this.promise
    //       .then(_ => {
    //         // Autoplay started!
    //         // console.log('success',_, promise);
    //       })
    //       .catch(error => {
    //         // Autoplay was prevented.
    //         // Show a "Play" button so that user can start playback.
    //         console.log("error", error, this.promise);
    //       });
    //   }
    }
    
  };
  startStopSession = () => {
    this.setState({
      triggerAudio: false
    });
    // const initialMinutes = this.initialState.sessionMinutes;
    // console.log(this.initialState, initialMinutes);
    this.sessionIntervalId = setInterval(() => {
      this.setState({
        sessionSeconds: this.state.sessionSeconds - 1
      });
      //both minutes and seconds === 0, then clear
      if (this.state.sessionSeconds === 0 && this.state.sessionMinutes === 0) {
        clearInterval(this.sessionIntervalId);
        this.setState({
          triggerAudio: true,
          // breakMounted: true,
          // startMounted: false,
          // sessionSeconds: 60,
          sessionMinutes: this.initialState.sessionMinutes
        });
        this.playAudio();
        // this.startStopBreak();
        // this.setState({
        //   sessionSeconds: 60
        // });
      }
      // seconds === 0, but minutes !== 0, subtract 1 from minutes and reset seconds
      if (this.state.sessionSeconds === 0 && this.state.sessionMinutes !== 0) {
        this.setState({
          sessionMinutes: this.state.sessionMinutes - 1,
          sessionSeconds: 60
        });
      }
    }, 100);
  };
  startStopBreak() {
    this.setState({
      triggerAudio: false
    });
    this.breakIntervalId = setInterval(() => {
      this.setState({
        breakSeconds: this.state.breakSeconds - 1
      });
      //both minutes and seconds === 0, then clear
      if (this.state.breakSeconds === 0 && this.state.breakMinutes === 0) {
        this.setState({
          triggerAudio: true,
          // breakMounted: false,
          // startMounted: true,
          // startStop: true,
          // breakSeconds: 60,
          breakMinutes: this.initialState.breakMinutes
        });
        this.playAudio();
        // this.startStopSession();
        // this.setState({
        //   breakSeconds: 60
        // });
        clearInterval(this.breakIntervalId);
      }
      // seconds === 0, but minutes !== 0, subtract 1 from minutes and reset seconds
      if (this.state.breakSeconds === 0 && this.state.breakMinutes !== 0) {
        this.setState({
          breakMinutes: this.state.breakMinutes - 1,
          breakSeconds: 60
        });
      }
    }, 100);
  }
  render() {
    return (
      <div className="pomodoro">
        <div className="b-di">
          <div id="break-decrement" onClick={this.handleBreakLengthDecrement}>
            Break Decrement
          </div>
          <div id="break-increment" onClick={this.handleBreakLengthIncrement}>
            Break Increment
          </div>

          <h3 id="break-label">Break Length</h3>
          <div id="break-length">{this.state.breakLength}</div>
          {this.state.breakMounted}
        </div>
        <div className="s-di">
          <div
            id="session-decrement"
            onClick={this.handleSessionLengthDecrement}
          >
            Session Decrement
          </div>
          <div
            id="session-increment"
            onClick={this.handleSessionLengthIncrement}
          >
            Session Increment
          </div>
          <h3 id="session-label">Session Length</h3>
          <div id="session-length">{this.state.sessionLength}</div>
        </div>
        {this.state.startMounted ? (
          <div className="session-container">
            <Session
              sessMinutes={this.state.sessionMinutes}
              sessSeconds={this.state.sessionSeconds}
              // sessStartStop={this.state.startStop}
            />
            <div
              id="start_stop"
              className="start-stop"
              onClick={this.handleStartStop}
            >
              Start/Pause
            </div>
          </div>
        ) : (
          <div className="break-container">
            <Break
              brkMinutes={this.state.breakMinutes}
              brkSeconds={this.state.breakSeconds}
            />
            <div id="start_stop" className="start-stop" onClick={this.pause}>
              Start/Pause
            </div>
          </div>
        )}
        <div id="reset" className="reset" onClick={this.handleReset}>
          Reset
        </div>
        <audio
          // src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
          src={alarm}
          id="beep"
          value="audio"
          // fuckingplay={this.playAudio}
          type="audio/mp3"
        />
      </div>
    );
  }
}

export default Pomodoro;
