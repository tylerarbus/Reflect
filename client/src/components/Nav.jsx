import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onClickHome = this.onClickHome.bind(this);
    this.onClickEntries = this.onClickEntries.bind(this);
    this.onClickProfile = this.onClickProfile.bind(this);
  }

  onClickHome() {
    this.props.dispatch(push('/'));
  }

  onClickEntries() {
    this.props.dispatch(push('/entries'));
  }

  onClickProfile() {
    this.props.dispatch(push('/signup'));
  }

  render() {
    return(
      <div id="navbar" className="ui menu">
        <a className="item"
           onClick={this.onClickHome}>
          Reflective
        </a>
        <a className="item"
           onClick={this.onClickEntries}>
          Entries
        </a>
        <div className="right menu">
          <a className="item"
             onClick={this.onClickProfile}>
            Profile
          </a>
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

export default connect(mapStateToProps)(Nav);