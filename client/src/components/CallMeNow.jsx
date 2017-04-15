import React, { Component } from 'react';
import { connect } from 'react-redux';

export class CallMeNow extends Component {
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(CallMeNow);