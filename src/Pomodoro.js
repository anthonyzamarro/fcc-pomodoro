import React, { Component } from 'react';
import Break from './components/break.js';
import Session from './components/session.js';

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakState: 5,
      sessionState: 25,
      breakMounted: false
    }
    // this.handleDecrement = this.handleDecrement.bind(this);
  }
  handleDecrement = () => {
    this.setState({
      breakState: this.state.breakState - 1
    })
  }
  showBreak = () => {
    console.log(this.state);
    this.setState({
      breakMounted: true
    })
  }
  render() {
    return (
      <div className="pomodoro">
        {this.state.breakMounted && <Break 
          value={this.state.breakState}/>}
        <div onClick={this.handleDecrement}>Decrement</div>
        <Session
        value={this.state.sessionState}/>
        <div onClick={this.showBreak}>Show Break</div>
      </div>
    );
  }
}

export default Pomodoro;
