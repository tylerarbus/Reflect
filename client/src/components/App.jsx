import React, { Component } from 'react'
import { fetchEntries } from '../actions/actions.js';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';
import Entries from './Entries.jsx';
import Timeline from './Timeline.jsx';
import CallMeNow from './CallMeNow.jsx';
import { dummyEntryData, dummyTimelineData } from '../dummyData.js';

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
      <div>
        <div className="ui three column grid">
          <Timeline months={dummyTimelineData}/>
          <Entries entries={dummyEntryData}/>
          <CallMeNow />
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

export default connect(mapStateToProps)(App);

