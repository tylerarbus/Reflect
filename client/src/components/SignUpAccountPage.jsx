import React, { Component } from 'react';
import { connect } from 'react-redux';
import { accountPageSubmit, createUser } from '../actions/actions.js';

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

    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordVerify = this.onChangePasswordVerify.bind(this);
  }

  onClickSubmit() {
    const {firstName, lastName, phone, password, passwordVerify} = this.state;
    // this.props.dispatch(accountPageSubmit());
    // console.log(this.state);

    if (firstName === null ||
      lastName === null ||
      phone === null ||
      password === null ||
      password !== passwordVerify) {
      this.setState({
        fieldErrors: true
      })
    } else {
      console.log('fields ok')
      var user = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: this.props.user.email,
        password: password
      }
      this.props.dispatch(createUser(user));
    }

  }

  onChangeFirstName(firstName) {
    this.setState({
      firstName: firstName
    });
  }

  onChangeLastName(lastName) {
    this.setState({
      lastName: lastName
    });
  }

  onChangePhone(phone) {
    this.setState({
      phone: phone
    });
  }

  onChangePassword(password) {
    this.setState({
      password: password
    });
  }

  onChangePasswordVerify(password) {
    this.setState({
      passwordVerify: password
    });
  }

  render() {
    return (
      <div>
        <form className="ui form">
          <h4 className="ui dividing header">Account Information</h4>
          <div className="field">
            <label>Name</label>
            <div className="two fields">
              <div className="field">
                <input type="text" placeholder="First Name"
                  onChange={(e) => {this.onChangeFirstName(e.target.value)}}/>
              </div>
              <div className="field">
                <input type="text" placeholder="Last Name"
                  onChange={(e) => {this.onChangeLastName(e.target.value)}}/>
              </div>
            </div>
          </div>
          <div className="field">
            <label>Phone</label>
            <div className="fields">
              <div className="sixteen wide field">
                <input type="text" placeholder="Phone Number"
                  onChange={(e) => {this.onChangePhone(e.target.value)}}/>
              </div>
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="fields">
              <div className="sixteen wide field">
                <input type="password" placeholder="Enter a password"
                  onChange={(e) => {this.onChangePassword(e.target.value)}}/>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="fields">
              <div className="sixteen wide field">
                <input type="password" placeholder="Verify password"
                  onChange={(e) => {this.onChangePasswordVerify(e.target.value)}}/>
              </div>
            </div>
          </div>
        </form>
        {this.state.fieldErrors &&
          <div className="ui error message">
            <div className="header">
              There were some errors with your submission
            </div>
            <ul className="list">
              <li>First Name and Last Name are required.</li>
              <li>Phone number is required (e.g. '4151234567').</li>
              <li>Passwords must match.</li>
            </ul>
          </div>}
        <div className={this.props.signUp.isCreatingUser ? "ui loading right floated submit button" : "ui right floated submit button"}
          onClick={this.onClickSubmit}>
          Submit
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    signUp: state.signUp
  }
}

export default connect(mapStateToProps)(SignUpAccountPage);