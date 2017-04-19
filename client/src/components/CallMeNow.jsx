import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeCall } from '../actions/call.js';

export class CallMeNow extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onClickCall = this.onClickCall.bind(this);
  }

  onClickCall() {
    this.props.dispatch(makeCall());
  }

  render() {
    return (
      <div className="right floated right aligned four wide column">
        <button
          id="call-now"
          className="huge ui button green"
          onClick={this.onClickCall}
        >
          Call Me Now
        </button>
      </div>
    );
  }

}

const mapStateToProps = state => (
  {
    user: state.user
  }
);

CallMeNow.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(CallMeNow);
