import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser } from './signup.actions.js';

export class SignUpAccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      phone: null,
      password: null,
      passwordVerify: null,
      fieldErrors: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordVerify = this.onChangePasswordVerify.bind(this);
  }

  onSubmit() {
    const { firstName, lastName, phone, password, passwordVerify } = this.state;

    if (firstName === null ||
      lastName === null ||
      phone === null ||
      password === null ||
      password !== passwordVerify) {
      this.setState({
        fieldErrors: true
      });
    } else {
      const user = {
        firstName,
        lastName,
        phone,
        email: this.props.user.email,
        password
      };
      this.props.dispatch(createUser(user));
    }
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangePasswordVerify(e) {
    this.setState({
      passwordVerify: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form
          className="ui form"
          onSubmit={this.onSubmit}
        >
          <h4 className="ui dividing header">Account Information</h4>
          <div className="field">
            <label>Name</label>
            <div className="two fields">
              <div className="field">
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={this.onChangeFirstName}
                  autoFocus
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  placeholder="Last Name"
                  onChange={this.onChangeLastName}
                />
              </div>
            </div>
          </div>
          <div className="field">
            <label>Phone</label>
            <div className="fields">
              <div className="sixteen wide field">
                <input
                  type="text"
                  placeholder="Phone Number"
                  onChange={this.onChangePhone}
                />
              </div>
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="fields">
              <div className="sixteen wide field">
                <input
                  type="password"
                  placeholder="Enter a password"
                  onChange={this.onChangePassword}
                />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="fields">
              <div className="sixteen wide field">
                <input
                  type="password"
                  placeholder="Verify password"
                  onChange={this.onChangePasswordVerify}
                />
              </div>
            </div>
          </div>
          <button
            type="Submit"
            style={{visibility: 'hidden'}}
          />
        </form>
        {this.state.fieldErrors &&
          <div className="ui error message">
            <div className="header">
              There were some errors with your submission
            </div>
            <ul className="list">
              <li>First Name and Last Name are required.</li>
              <li>Phone number is required (e.g. 4151234567).</li>
              <li>Passwords must match.</li>
            </ul>
          </div>}
        <div
          className={this.props.signUp.isCreatingUser ? 'ui loading right floated submit button' : 'ui right floated submit button'}
          onClick={this.onSubmit}
        >
          Submit
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => (
  {
    user: state.user,
    signUp: state.signup
  }
);

SignUpAccountPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  signUp: PropTypes.oneOf([PropTypes.bool, PropTypes.string]),
  user: PropTypes.oneOf([PropTypes.bool, PropTypes.string, PropTypes.number])
};

SignUpAccountPage.defaultProps = {
  signup: {},
  user: {}
};

export default connect(mapStateToProps)(SignUpAccountPage);
