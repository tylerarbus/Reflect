import React, { Component } from 'react';
import { connect } from 'react-redux';
import Entry from './Entry.jsx';

const dummyEntries = [
  {
    date: 'Jan 3, 2017', 
    text: 'Test entry #1'
  },
  {
    date: 'April 6, 2017',
    text: 'Test entry #2'
  }
];

export default class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    return (
      <div className="eight wide column">
        {dummyEntries.map(entry => <Entry date={entry.date} text={entry.text} key={entry.date}/>)}
      </div>
    )
  }
}