import React, { Component } from 'react'
import { fetchEntries } from '../actions/actions.js';
import { connect } from 'react-redux';
import Entries from './Entries.jsx';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchEntries());
  }

  render() {
    return (
      <Entries />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(App);