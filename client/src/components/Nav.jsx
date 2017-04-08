import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onClickHome = this.onClickHome.bind(this);
    this.onClickEntries = this.onClickEntries.bind(this);
  }

  onClickHome() {
    this.props.dispatch(push('/'));
  }

  onClickEntries() {
    this.props.dispatch(push('/entries'));
  }

  render() {
    return(
      <div id="navbar" className="ui menu">
        <div className="ui container">
          <a onClick={this.onClickHome} className="item">Reflective</a>
          <a onClick={this.onClickEntries} className="item">Entries</a>
          <div className="right menu">
            <a className="item">Profile</a>
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

export default connect(mapStateToProps)(Nav);