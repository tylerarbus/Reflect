import { combineReducers } from 'redux';

import { RECEIVE_ENTRIES } from '../actions/actions.js';

function entries(state = {
  entries: [],
  receivedAt: ''
}, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return {
        ...state,
        entries: action.entries,
        receivedAt: action.receivedAt
      }
  default:
    return state;
  }
}


const rootReducer = combineReducers({
  entries
});

export default rootReducer;