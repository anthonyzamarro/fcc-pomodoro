import React, { Component } from 'react';

class Break extends Component {
	constructor(props) {
		super(props);
    this.state = {
      isMounted: false
    }
	}
  componentDidMount() {
    this.setState({
      isMounted: true
    })
    // console.log(this.props);
    // this.props.intId = setInterval(() => this.startBreak(), 100)
    // clearInterval(this.props.intId);
  }
  startBreak = () => {
    console.log('break time!')
  }
  render() {
    let seconds = this.props.brkSeconds === 60 || this.props.brkSeconds === 0 ? '00'  : this.props.brkSeconds;
    let minutes = this.props.brkMinutes === 0 ? '00' : this.props.brkMinutes;
    return (
      <div className="break">
      <h3 className="breal_time">REAL Break Time!</h3>
        {minutes}:{seconds}
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
