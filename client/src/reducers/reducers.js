import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { RECEIVE_ENTRIES, REQUEST_ENTRIES, USER_SUBMIT_EMAIL, CREATING_USER, SIGN_UP_ERROR, RECEIVE_USER_INFO } from '../actions/actions.js';

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

function signUp(state = {
  isCreatingUser: false,
  errorMessage: null
}, action) {
  switch (action.type) {
    case CREATING_USER:
      return {
        ...state,
        isCreatingUser: true
      }
    case SIGN_UP_ERROR: 
      return {
        ...state,
        errorMessage: action.errorMessage
      }
    case USER_CREATED:
      return {
        isCreatingUser: false,
        errorMessage: null
      }
    default:
      return state;
  }
}


function user(state = {
  id: null,
  firstName: '',
  lastName: '',
  phone: '',
  email: ''
}, action) {
  switch (action.type) {
    case USER_SUBMIT_EMAIL:
      return {
        ...state,
        email: action.email
      }
    case RECEIVE_USER_INFO:
      return {
        ...state,
        id: action.id,
        firstName: action.firstName,
        lastName: action.lastName,
        phone: action.phone,
        password: action.password
      }
    default: 
      return state;
  }
}

const rootReducer = combineReducers({
  entries,
  user,
  router: routerReducer
});

export default rootReducer;