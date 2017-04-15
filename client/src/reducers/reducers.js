import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { RECEIVE_ENTRIES, REQUEST_ENTRIES, USER_SUBMIT_EMAIL, CREATING_USER, SIGN_UP_ERROR, RECEIVE_USER_INFO, USER_CREATED, ACCOUNT_PAGE_SUBMIT, PHONE_VERIFY_SUBMIT, VERIFYING_CODE, CODE_VERIFIED, CODE_ERROR, LOGIN_SUBMIT, LOGIN_ERROR, LOGIN_SUCCESSFUL } from '../actions/actions.js';

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
  errorMessage: null,
  accountPage: true,
  phoneVerificationPage: false,
  phonePreferencesPage: false,
  isVerifyingCode: false
}, action) {
  switch (action.type) {
    case ACCOUNT_PAGE_SUBMIT:
      return {
        ...state,
        accountPage: false,
        phoneVerificationPage: true,
        phonePreferencesPage: false
      }
    case PHONE_VERIFY_SUBMIT:
      return {
        ...state,
        accountPage: false,
        phoneVerificationPage: false,
        phonePreferencesPage: true
      }
    case CREATING_USER:
      return {
        ...state,
        isCreatingUser: true
      }
    case SIGN_UP_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isCreatingUser: false
      }
    case USER_CREATED:
      return {
        ...state,
        isCreatingUser: false,
        errorMessage: null
      }
      case VERIFYING_CODE:
        return {
          ...state,
          isVerifyingCode: true
        }
      case CODE_VERIFIED:
        return {
          ...state,
          isVerifyingCode: false
        }
      case CODE_ERROR:
        return {
          ...state,
          isVerifyingCode: false,
          errorMessage: action.error
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
  email: '',
  isLoggingIn: false,
  error: null
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
      }
    case LOGIN_SUBMIT:
      return {
        ...state,
        isLoggingIn: true
      }
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        error: action.error
      }
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        id: action.id,
        firstName: action.firstName,
        lastName: action.lastName,
        phone: action.phone,
        email: action.email,
        isLoggingIn: false,
        error: null
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  entries,
  signUp,
  user,
  router: routerReducer
});

export default rootReducer;