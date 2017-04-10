import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (props) => (
  <div className="ui piled container segment">
    <h4 className="ui header">{props.date}</h4>
    <p>{props.text}</p>
  </div>
)

