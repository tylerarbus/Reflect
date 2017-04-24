import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entries from './components/entries/entries.reducer.js';
import signUp from './components/landing/user_signup.reducer.js';
import user from './components/landing/user.reducer.js';
import trends from './components/trends/trends.reducer.js';

const rootReducer = combineReducers({
  entries,
  signUp,
  user,
  trends,
  router: routerReducer
});

export default rootReducer;
