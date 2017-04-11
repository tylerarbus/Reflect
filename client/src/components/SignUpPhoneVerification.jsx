import React, { Component } from 'react';
import { connect } from 'react-redux';

export class SignUpPhoneVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
    )
  }

}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(SignUpPhoneVerification);