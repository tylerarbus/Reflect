import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers/rootReducer.js';


const loggerMiddleware = createLogger();
const history = createHistory();
const router = routerMiddleware(history);

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware, router)
  );

  if (module.hot) {
    module.hot.accept('./reducers/rootReducer.js', () => {
      const nextRootReducer = require('./reducers/rootReducer.js').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
export { history, configureStore };
