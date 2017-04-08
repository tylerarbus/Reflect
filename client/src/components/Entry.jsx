import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (props) => (
  <div>
    <b>Date:</b> {props.date}
    <b>Text:</b> {props.text}
  </div>
)

