import React, { Component } from 'react';
import { connect } from 'react-redux';

const gridStyle = {
  marginTop: '14px'
};

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: null,
      minute: null,
      ampm: null
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
  }

  render() {
    return (
      <div
        className="ui grid"
        style={gridStyle}
      >
        <div className="twelve wide column centered">
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
          <div
            className="ui right floated submit button"
            onClick={this.onClickSubmit}
          >
            Submit
          </div>
          <br />
          <br />
          <h4 className="ui dividing header">Logout</h4>
          <div className="field">
            <label>Logout</label>
          </div>
          <div
            className="ui right floated submit button"
            onClick={this.onClickSubmit}
          >
            Logout
          </div>
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

export default connect(mapStateToProps)(Profile);
