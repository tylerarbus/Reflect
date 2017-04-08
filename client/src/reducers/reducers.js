import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { RECEIVE_ENTRIES, REQUEST_ENTRIES } from '../actions/actions.js';

function entries(state = {
  entries: [],
  receivedAt: '',
  isFetching: false
}, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return {
        ...state,
        entries: action.entries,
        receivedAt: action.receivedAt,
        isFetching: action.isFetching
      }
    case REQUEST_ENTRIES:
      return {
        ...state,
        isFetching: action.isFetching
      }
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  entries,
  router: routerReducer
});

export default rootReducer;