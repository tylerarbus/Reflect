import React from 'react';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';

import App from './App.jsx';
import Nav from './Nav.jsx';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store} >
        <Nav>
          <ConnectedRouter history={this.props.history}>
            <Route exact path='/' component={App} />
          </ConnectedRouter>
        </Nav>
      </Provider>
    )
  }
}