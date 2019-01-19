import React, { Component } from 'react';
import Break from './components/break.js';
import Session from './components/session.js';

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakSeconds: 60,
      breakMinutes: 5,
      breakLength: 5,
      breakMounted: false,
      sessionMinutes: 0,
      sessionLength: 25,
      sessionSeconds: 60,
      startStop: false,
      triggerAudio: false
    }
  }
  componentDidMount() {
    //set initialState so we can reset if needed
    this.initialState = this.state;
    this.startBreak();
  }
  handleSessionDecrement = () => {
    this.setState({
      sessionMinutes: this.state.sessionMinutes - 1
    })
    if (this.state.sessionMinutes <= 0) this.setState({sessionMinutes: 0});
  }
  handleSessionLengthDecrement = () => {
    this.setState({
      sessionLength: this.state.sessionLength - 1
    })
    this.handleSessionDecrement();
    if (this.state.sessionLength <= 0) this.setState({sessionLength: 0});
  }
  handleSessionIncrement = () => {
    this.setState({
      sessionMinutes: this.state.sessionMinutes + 1
    })
    if (this.state.sessionMinutes >= 60) this.setState({sessionMinutes: 60});
  }
  handleSessionLengthIncrement = () => {
    this.setState({
      sessionLength: this.state.sessionLength + 1
    })
    this.handleSessionIncrement();
    if (this.state.sessionLength >= 60) this.setState({sessionLength: 60});
  }
  handleBreakDecrement = () => {
    this.setState({
      breakMinutes: this.state.breakMinutes - 1
    })
    if (this.state.breakMinutes <= 0) this.setState({breakMinutes: 0});
  }
  handleBreakLengthDecrement = () => {
    this.setState({
      breakLength: this.state.breakLength - 1
    })
    this.handleBreakDecrement();
    if (this.state.breakLength <= 0) this.setState({breakLength: 0});
  }
  handleBreakIncrement = () => {
    this.setState({
      breakMinutes: this.state.breakMinutes + 1
    })
    if (this.state.breakMinutes >= 60) this.setState({breakMinutes: 60});
  }
  handleBreakLengthIncrement = () => {
    this.setState({
      breakLength: this.state.breakLength + 1
    })
    this.handleBreakIncrement();
    if (this.state.breakLength >= 60) this.setState({breakLength: 60});
  }
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
      clearInterval(this.setIntervalId)
    }
  }
  handleReset = () => {
    clearInterval(this.setIntervalId);
    this.setState({...this.initialState});
  }
  playAudio = () => {
    if (this.state.triggerAudio) {
      let promise = document.querySelector("#beep").play();
      if (promise !== undefined) {
        promise
          .then(_ => {
            // Autoplay started!
            // console.log('success',_, promise);
          })
          .catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
            console.log("error", error, promise);
          });
      }
    }
  }
  startStopSession = () => {
    console.log(this.state.startStop);
    // const initalMinutes = this.state.sessionMinutes;
    this.setIntervalId = setInterval(() => {
      this.setState({
        sessionSeconds: this.state.sessionSeconds - 1
      });
      //both minutes and seconds === 0, then clear
      if (this.state.sessionSeconds === 0 && this.state.sessionMinutes === 0) {
        clearInterval(this.setIntervalId)
        this.setState({
          triggerAudio: true,
          breakMounted: true
          // sessionSeconds: 60,
          // sessionMinutes: initalMinutes
        });
      }
      // seconds === 0, but minutes !== 0, subtract 1 from minutes and reset seconds
      if (this.state.sessionSeconds === 0 && this.state.sessionMinutes !== 0) {
        this.setState({
          sessionMinutes: this.state.sessionMinutes - 1,
          sessionSeconds: 60
        });
      }
    }, 100);

    // if (this.state.breakMounted) {
    //   this.setIntervalId = setInterval(() => this.startBreak(), 100);
    //   console.log(this.setIntervalId, this.state)
    // }
  }
  startBreak = () => {
    if (this.state.breakMounted) {
      console.log(this.state)
    }
    // this.setState({
    //   breakSeconds: this.state.breakSeconds - 1
    // });
    // //both minutes and seconds === 0, then clear
    // if (this.state.breakSeconds === 0 && this.state.breakMinutes === 0) {
    //   clearInterval(this.setIntervalId)
    //   this.setState({
    //     triggerAudio: true,
    //     // breakMounted: false
    //     // sessionSeconds: 60,
    //     // sessionMinutes: initalMinutes
    //   });
    // }
    // // seconds === 0, but minutes !== 0, subtract 1 from minutes and reset seconds
    // if (this.state.breakSeconds === 0 && this.state.breakMinutes !== 0) {
    //   this.setState({
    //     breakMinutes: this.state.breakMinutes - 1,
    //     breakSeconds: 60
    //   });
    // }
  }
  render() {
    return (
      <div className="pomodoro">
        <div onClick={this.handleBreakLengthDecrement}>Break Decrement</div>
        <div onClick={this.handleBreakLengthIncrement}>Break Increment</div>
        <div id="break-length">{this.state.breakLength}</div>
        {this.state.breakMounted && 
          <Break
            brkMinutes={this.state.breakMinutes}
            brkSeconds={this.state.breakSeconds}
            intId={this.setIntervalId}
          />
        }
        <div onClick={this.handleSessionLengthDecrement}>Session Decrement</div>
        <div onClick={this.handleSessionLengthIncrement}>Session Increment</div>
        <div id="session-length">{this.state.sessionLength}</div>
        <Session
          sessMinutes={this.state.sessionMinutes}
          sessSeconds={this.state.sessionSeconds}
          // sessStartStop={this.state.startStop}
        />
        <div
          id="start_stop"
          onClick={this.handleStartStop}
        >
          Start/Pause
        </div>
        <div
          id="reset"
          onClick={this.handleReset}
        >
          Reset
        </div>
        <audio
          src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
          id="beep"
          value="audio"
          fuckingplay={this.playAudio()}
          type="audio/mp3"
        />
      </div>
    );
  }
}

export default Pomodoro;


// {this.state.startStop 
//   ?
//   <Session
//     sessTime={this.state.sessionState}
//     sessStart={this.state.startStop}
//   />
//   :
//   <div>
//     <h3>Session Time!</h3>
//     {`${this.state.sessionState}:00`}
//   </div>
// }
/*
  Main behaviors:
    increment
    decrement
    start time at what user sets
    pause time and resume at current time
    reset all back to original state
    play audio
    pause/stop audio
    reset audio

    a start button that also stops.
    










*/