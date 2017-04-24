import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entries from './components/entries/entries.reducer.js';
import signup from './components/signup/signup.reducer.js';
import user from './components/landing/user.reducer.js';
import trends from './components/trends/trends.reducer.js';
import calling from './components/entries/calling.reducer.js';

const rootReducer = combineReducers({
  entries,
  signup,
  user,
  trends,
  calling,
  router: routerReducer
});

export default rootReducer;
