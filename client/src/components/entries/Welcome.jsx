import React, { Component } from 'react';
import { connect } from 'react-redux';

const welcomeStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -60%)'
};

const Welcome = () => (
  <div
    className="ui text container"
    style={welcomeStyle}
  >
    <h1 className="ui header">Welcome</h1>
    <h3>Congrats on making your new Reflective account!</h3>
    <h3>
      <ul>
        <li>Every day you will receive a 60 second phone call from us to record how your day went. You can talk about what made you happy, what made you sad, something interesting that happened, or anything else you want to talk about.</li>
        <br/>
        <li>We will record your entry each day and add it here to your own private journal.</li>
        <br/>
        <li>You can come back at any time to view your past entries or visit the Insights Page to see interesting emotional trends.</li>
      </ul>
    </h3>
    <h3>Click <i>Call Me Now</i> to record your first entry!</h3>
  </div>
);

export default Welcome;