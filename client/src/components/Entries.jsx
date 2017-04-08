import React, { Component } from 'react';
import { connect } from 'react-redux';
import Entry from './Entry.jsx';

const dummyEntries = [
  {
    date: 'Jan 3, 2017', 
    text: 'Today was a good day. I counted \
    my money for a few hours and then ate some expensive snails. I love money!'
  },
  {
    date: 'April 6, 2017',
    text: 'I got a few more people sick today. Awesome! Greed is good baby!'
  }
];

export default class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    return (
      <div>
        {dummyEntries.map(entry => <Entry date={entry.date} text={entry.text} key={entry.date}/>)}
      </div>
    )
  }
}