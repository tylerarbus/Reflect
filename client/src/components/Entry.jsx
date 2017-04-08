import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (props) => (
  <div class="ui piled container segment">
    <h4 class="ui header">{props.date}</h4>
    <p>{props.text}</p>
  </div>
)

