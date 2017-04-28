import React from 'react';

const welcomeStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -60%)',
  textAlign: 'left'
};

export function Welcome() {
  return (
    <div
      className="ui text container"
      style={welcomeStyle}
    >
      <h1 className="ui header">Welcome</h1>
      <h3>Congrats on making your new Reflective account!</h3>
      <h3>
        <ul>
          <li>Every day you will receive a 60 second phone call from us to record how your day went. You can talk about what made you happy, what made you sad, something interesting that happened, or anything else you want to talk about.</li>
          <br />
          <li>We will record your entry each day and add it here to your own private journal.</li>
          <br />
          <li>You can come back at any time to view your past entries or visit the Insights Page to see interesting emotional trends.</li>
        </ul>
      </h3>
      <h3>Click <i>Call Me Now</i> to record your first entry!</h3>
    </div>
  );
}

export function LoadingEntries() {
  return (
    <div style={{ height: '100%' }}>
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading Entries</div>
      </div>
      <p></p>
    </div>
  );
}

export function NoResults() {
  return (
    <div
      className="ten wide column"
      style={{ marginTop: '14px' }}
    >
      <div className="ui container" style={{ border: 'none' }} >
        <i className="large search icon" style={{ marginBottom: '10px' }} />
        <h2 style={{ display: 'inline-block' }} >&nbsp;Sorry, no results found.</h2>
      </div>
    </div>
  );
}

export function Searching() {
  return (
    <div
      className="ten wide column"
      style={{ marginTop: '14px' }}
    >
      <div className="ui container" style={{ border: 'none' }} >
        <i className="large spinner loading icon" style={{ marginBottom: '10px' }} />
        <h2 style={{ display: 'inline-block' }} >&nbsp;Searching...</h2>
      </div>
    </div>
  );
}
