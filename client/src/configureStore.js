import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/reducers.js';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  if(module.hot) {
    module.hot.accept('./reducers/reducers.js', () => {
      const nextReducer = require('./reducers/reducers.js').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}