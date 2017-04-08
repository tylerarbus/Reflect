import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div id="navbar">
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