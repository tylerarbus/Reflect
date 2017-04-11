import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUpAccountPage from './SignUpAccountPage.jsx';
import SignUpPhoneVerification from './SignUpPhoneVerification.jsx';
import SignUpPhonePreferences from './SignUpPhonePreferences.jsx';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountPage: true,
      phoneVerificationPage: false,
      phonePreferencesPage: false
    };

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  onClickSubmit() {
    if (this.state.accountPage) {
      this.setState({
        accountPage: false,
        phoneVerificationPage: true,
        phonePreferencesPage: false
      });
    }

    if (this.state.phoneVerificationPage) {
      this.setState({
        accountPage: false,
        phoneVerificationPage: false,
        phonePreferencesPage: true
      });
    }

    if (this.state.phonePreferencesPage) {
      this.setState({
        accountPage: false,
        phoneVerificationPage: false,
        phonePreferencesPage: true
      });
    }

  }

  render() {
    return (
      <div className="ui grid">
        <div className="twelve wide column centered">
          <div className="ui three top attached steps">
            <div className={this.state.accountPage ? "active step" : "step"}>
              <i className="user icon"></i>
              <div className="content">
                <div className="title">Account Info</div>
                <div className="description">Create your Account</div>
              </div>
            </div>
            <div className={this.state.phoneVerificationPage ? "active step" : "step"}>
              <i className="checkmark icon"></i>
              <div className="content">
                <div className="title">Phone Verification</div>
                <div className="description">Verifiy Phone Number</div>
              </div>
            </div>
            <div className={this.state.phonePreferencesPage ? "active step" : "step"}>
              <i className="call icon"></i>
              <div className="content">
                <div className="title">Call Preferences</div>
                <div className="description">Add Phone Preferences</div>
              </div>
            </div>
          </div>
          <br/>
          <br/>
        </div>
        <div className="ten wide column centered">
          {this.state.accountPage && <SignUpAccountPage />}
          {this.state.phoneVerificationPage && <SignUpPhoneVerification />}
          {this.state.phonePreferencesPage && <SignUpPhonePreferences />}
          <div className="ui right floated submit button"
               onClick={this.onClickSubmit}>
            Submit
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(SignUp);