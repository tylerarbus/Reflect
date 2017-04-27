import React from 'react';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchUserInfo } from './landing/user.actions.js';
import Entries from './entries/Index.jsx';
import Landing from './landing/Index.jsx';
import Nav from './nav/Index.jsx';
import Signup from './signup/Index.jsx';
import Trends from './trends/Index.jsx';
import Profile from './profile/Index.jsx';

export class Root extends React.Component {

  componentDidMount() {
    const { dispatchFetchUserInfo } = this.props;
    const token = localStorage.getItem('reflective_token');

    if (token) {
      dispatchFetchUserInfo(token);
    }
  }

  render() {
    return (
      <Provider store={this.props.store} >
        <div style={{ height: '100%' }}>
          <Nav />
          <ConnectedRouter history={this.props.history}>
            <div style={{ height: '100%', paddingTop: '52px' }}>
              <Route exact path="/" component={Landing} />
              <Route path="/entries" component={Entries} />
              <Route path="/signup" component={Signup} />
              <Route path="/trends" component={Trends} />
              <Route path="/profile" component={Profile} />
            </div>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = state => (
  {
    ...state
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchFetchUserInfo: token => dispatch(fetchUserInfo(token))
  }
);

Root.propTypes = {
  dispatchFetchUserInfo: PropTypes.func.isRequired,
  store: PropTypes.objectOf(PropTypes.oneOfType(
      [PropTypes.string, PropTypes.array, PropTypes.object]
    )).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
