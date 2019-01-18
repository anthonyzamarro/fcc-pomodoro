import React, { Component } from 'react';

class Session extends Component {
	constructor(props) {
		super(props);
    // console.log(props)
	}
  render() {
    return (
      <div className="session">
      <h3 className="session_time">Session Time!</h3>
        {this.props.value}
      </div>
    );
  }
}

export default Session;
