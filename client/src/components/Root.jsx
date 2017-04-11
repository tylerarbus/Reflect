import React from 'react';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';

import App from './App.jsx';
import Home from './Home.jsx';
import Nav from './Nav.jsx';
import SignUp from './SignUp.jsx';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store} >
        <div>
          <Nav/>
          <ConnectedRouter history={this.props.history}>
            <div>
              <Route exact path='/' component={Home} />
              <Route path='/entries' component={App} />
              <Route path='/signup' component={SignUp} />
            </div>
          </ConnectedRouter>
        </div>
      </Provider>
    )
  }
}