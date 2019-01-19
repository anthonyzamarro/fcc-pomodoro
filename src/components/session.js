import React, { Component } from 'react';

class Session extends Component {
	// constructor(props) {
	// 	super(props);
 //    this.state = {
 //      minutes: this.props.sessMinutes,
 //      seconds: this.props.sessSeconds
 //    }
 //  }

  // startStopSession = () => {
  //  this.setState({
  //     seconds: this.state.seconds - 1
  //   });
  // }

  render() {
    let seconds = this.props.sessSeconds === 60 || this.props.sessSeconds === 0 ? '00'  : this.props.sessSeconds;
    let minutes = this.props.sessMinutes === 0 ? '00' : this.props.sessMinutes;
    return (
      <div className="session">
      <h3 className="session_time">REAL Session Time!</h3>
        {minutes}:{seconds}
      </div>
    );
  }
}

export default Session;
