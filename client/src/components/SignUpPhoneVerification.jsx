import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyPhoneCode } from '../actions/actions.js';

export class SignUpPhoneVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationCode: null
    };

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  onClickSubmit() {
    // this.props.dispatch(phoneVerifySubmit());
    this.props.dispatch(verifyPhoneCode(this.state.verificationCode));
  }

  onChangeCode(code) {
    this.setState({
      verificationCode: code
    });
  }

  render() {
    return (
      <div>
        <form className="ui form">
          <h4 className="ui dividing header">Phone Verification</h4>
          <div className="field">
            <label>Verification Code</label>
            <div className="fields">
              <div className="field">
                <input type="text" placeholder="Enter Code"
                  onChange={(e) => {this.onChangeCode(e.target.value)}}/>
              </div>
            </div>
          </div>
        </form>
        <div className="ui right floated submit button"
          onClick={this.onClickSubmit}>
          Submit
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

export default connect(mapStateToProps)(SignUpPhoneVerification);