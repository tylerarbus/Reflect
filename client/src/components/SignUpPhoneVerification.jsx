import React, { Component } from 'react';
import { connect } from 'react-redux';
import { phoneVerifySubmit } from '../actions/actions.js';

export class SignUpPhoneVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  onClickSubmit() {
    this.props.dispatch(phoneVerifySubmit());
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
                <input type="text" placeholder="Enter Code"/>
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