import React from 'react';
import { Provider, connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';

import { fetchUserInfo } from '../actions/actions.js';
import App from './App.jsx';
import Home from './Home.jsx';
import Nav from './Nav.jsx';
import SignUp from './SignUp.jsx';
import Trends from './trends/Root.jsx';
import Profile from './Profile.jsx';

export class Root extends React.Component {

  componentDidMount() {
    const { fetchUserInfo } = this.props;
    const token = localStorage.getItem('reflective_token');

    if (token) {
      fetchUserInfo(token);
    }
  }

  render() {
    return (
      <Provider store={this.props.store} >
        <div style={{'height':'100%'}}>
          <Nav/>
          <ConnectedRouter history={this.props.history}>
            <div style={{'height': 'calc(100% - 48px)'}}>
              <Route exact path='/' component={Home} />
              <Route path='/entries' component={App} />
              <Route path='/signup' component={SignUp} />
              <Route path='/trends' component={Trends} />
              <Route path='/profile' component={Profile} />
            </div>
          </ConnectedRouter>
        </div>
      </Provider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: (token) => dispatch(fetchUserInfo(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);