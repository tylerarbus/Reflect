import React, { Component } from 'react';
import { connect } from 'react-redux';

export class SignUpAccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <form className="ui form">
        <h4 className="ui dividing header">Account Information</h4>
        <div className="field">
          <label>Name</label>
          <div className="two fields">
            <div className="field">
              <input type="text" placeholder="First Name"/>
            </div>
            <div className="field">
              <input type="text" placeholder="Last Name"/>
            </div>
          </div>
        </div>
        <div className="field">
          <label>Phone</label>
          <div className="fields">
            <div className="sixteen wide field">
              <input type="text" placeholder="Phone Number"/>
            </div>
          </div>
        </div>
        <div className="field">
          <label>Password</label>
          <div className="fields">
            <div className="sixteen wide field">
              <input type="password" placeholder="Enter a password"/>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="fields">
            <div className="sixteen wide field">
              <input type="password" placeholder="Verify password"/>
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

export default connect(mapStateToProps)(SignUpAccountPage);