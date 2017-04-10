import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/reducers.js';

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

const loggerMiddleware = createLogger();
const history = createHistory();
const router = routerMiddleware(history);

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware, router)
  );
  
  return store;
}
export { history, configureStore }