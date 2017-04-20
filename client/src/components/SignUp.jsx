import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignUpAccountPage from './SignUpAccountPage.jsx';
import SignUpPhoneVerification from './SignUpPhoneVerification.jsx';
import SignUpPhonePreferences from './SignUpPhonePreferences.jsx';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ui grid">
        <div className="twelve wide column centered">
          <div className="ui three top attached steps">
            <div className={this.props.signUp.accountPage ? 'active step' : 'step'}>
              <i className="user icon" />
              <div className="content">
                <div className="title">Account Info</div>
                <div className="description">Create your Account</div>
              </div>
            </div>
            <div className={this.props.signUp.phoneVerificationPage ? 'active step' : 'step'}>
              <i className="checkmark icon" />
              <div className="content">
                <div className="title">Phone Verification</div>
                <div className="description">Verify Phone Number</div>
              </div>
            </div>
            <div className={this.props.signUp.phonePreferencesPage ? 'active step' : 'step'}>
              <i className="call icon" />
              <div className="content">
                <div className="title">Call Preferences</div>
                <div className="description">Add Phone Preferences</div>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
        <div className="ten wide column centered">
          {this.props.signUp.accountPage &&
            <SignUpAccountPage />}
          {this.props.signUp.phoneVerificationPage &&
            <SignUpPhoneVerification />}
          {this.props.signUp.phonePreferencesPage &&
            <SignUpPhonePreferences />}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => (
  {
    user: state.user,
    signUp: state.signUp
  }
);

SignUp.propTypes = {
  signUp: PropTypes.oneOf([PropTypes.string, PropTypes.bool])
};

SignUp.defaultProps = {
  signUp: {}
};

export default connect(mapStateToProps)(SignUp);
