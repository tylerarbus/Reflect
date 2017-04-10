import React, { Component } from 'react';

export default class CallMeNow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="right floated right aligned four wide column">
        <button id="call-now" className="huge ui button green">
        Call Me Now
        </button>
      </div>
    )
  }

}