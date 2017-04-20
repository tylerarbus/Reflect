import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { phonePrefsSubmit } from '../actions/user_signup.js';

export class SignUpPhonePreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: null,
      minute: null,
      ampm: null,
      showError: false
    };

    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onHourChange = this.onHourChange.bind(this);
    this.onMinuteChange = this.onMinuteChange.bind(this);
    this.onAmPmChange = this.onAmPmChange.bind(this);
  }

  onHourChange(e) {
    this.setState({
      hour: e.target.value
    });
  }

  onMinuteChange(e) {
    this.setState({
      minute: e.target.value
    });
  }

  onAmPmChange(e) {
    this.setState({
      ampm: e.target.value
    });
  }

  onClickSubmit() {
    console.log(this.state);
    const { hour, minute, ampm } = this.state;
    if (hour === null ||
      minute === null ||
      ampm === null) {
      this.setState({
        showError: true
      });
    } else {
      let prefs = {
        userId: this.state.userId,
        timeOfDay: `${hour}:${minute}${ampm}`
      };
      this.props.dispatch(phonePrefsSubmit(prefs));
    }
  }

  render() {
    return (
      <div>
        <form className="ui form">
          <h4 className="ui dividing header">Call Preferences</h4>
          <div className="field">
            <label>Scheduled Call Time</label>
            <div className=" three fields">
              <div className="two wide field">
                <select
                  className="ui fluid search dropdown"
                  onChange={this.onHourChange}
                >
                  <option value="">Hour</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              :
              <div className="two wide field">
                <select
                  className="ui fluid search dropdown"
                  onChange={this.onMinuteChange}
                >
                  <option value="">Minute</option>
                  <option value="00">00</option>
                  <option value="05">05</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                </select>
              </div>
              <div className="two wide field">
                <select
                  className="ui fluid search dropdown"
                  onChange={this.onAmPmChange}
                >
                  <option value="">Select</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        {this.state.showError &&
          <div className="ui error message">
            <div className="header">
              There were some errors with your submission
            </div>
            <ul className="list">
              <li>This field is required for us to schedule your daily call.</li>
            </ul>
          </div>}
        <div
          className="ui right floated submit button"
          onClick={this.onClickSubmit}
        >
          Submit
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => (
  {
    ...state
  }
);

SignUpPhonePreferences.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(SignUpPhonePreferences);
