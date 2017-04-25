import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeCall } from './calling.actions.js';

const buttonDivStyle = {
  marginTop: '14px'
};

const buttonStyle = {
  backgroundColor: '#89EEB2',
  width: '180px'
};

export class CallMeNow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      showCallPlaced: false
    };

    this.onClickCall = this.onClickCall.bind(this);
  }

  onClickCall() {
    this.props.dispatch(makeCall());
    this.setState({
      showCallPlaced: true
    });
    this.setState({
      showLoader: true
    });
    setTimeout(() => {
      this.setState({
        showLoader: false
      });
    }, 2000);
  }

  render() {
    return (
      <div
        className="right floated right aligned three wide column"
        style={buttonDivStyle}
      >
        <button
          id="call-now"
          className={this.state.showLoader ? "huge ui button loading" : "huge ui button"}
          style={buttonStyle}
          onClick={this.onClickCall}
        >
          {this.state.showCallPlaced ? 'Call Placed' : 'Call Me Now'}
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
