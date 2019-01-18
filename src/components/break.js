import React, { Component } from 'react';

class Break extends Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
      <div className="break">
      <h3 className="break_time">Break Time!</h3>
        {this.props.value}
      </div>
    );
  }
}

export default Break;
