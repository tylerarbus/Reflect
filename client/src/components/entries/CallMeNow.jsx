import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeCall } from './calling.actions.js';

const buttonStyle = {
  marginTop: '14px'
};

export class CallMeNow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false
    };

    this.onClickCall = this.onClickCall.bind(this);
  }

  onClickCall() {
    this.props.dispatch(makeCall());
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
        className="right floated right aligned four wide column"
        style={buttonStyle}
      >
        <button
          id="call-now"
          className={this.state.showLoader ? "huge ui button loading" : "huge ui button"}
          style={{ backgroundColor: '#89EEB2' }}
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
