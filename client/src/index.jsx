import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import { history, configureStore } from './configureStore.js';
import { Route } from 'react-router-dom';
import { ConnectedRouter, push } from 'react-router-redux';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App}/>
      </div>
    </ConnectedRouter>
  </Provider>, document.getElementById('app')
);