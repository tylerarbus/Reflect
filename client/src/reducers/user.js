import { USER_SUBMIT_EMAIL, RECEIVE_USER_INFO, REQUEST_USER_INFO, PHONE_PREFS_SUBMIT, PHONE_PREFS_SUBMITTED, PHONE_PREFS_ERROR } from '../actions/user_signup';
import { LOGIN_SUBMIT, LOGIN_ERROR, LOGIN_SUCCESSFUL } from '../actions/login';
import { CALLING_NOW, CALL_ERROR, CALL_SENT } from '../actions/call.js';

const initialState = {
  id: null,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  isLoggingIn: false,
  isCalling: false,
  isSubmittingPhonePrefs: false,
  fetchingUserInfo: false,
  error: null
};

export default function user(state=initialState, action) {
  switch (action.type) {
    case USER_SUBMIT_EMAIL:
      return {
        ...state,
        email: action.email
      }
    case REQUEST_USER_INFO:
      return {
        ...state,
        fetchingUserInfo: action.isFetching
      }
    case RECEIVE_USER_INFO:
      return {
        ...state,
        id: action.id,
        firstName: action.firstName,
        lastName: action.lastName,
        phone: action.phone,
        fetchingUserInfo: action.isFetching
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
    case CALLING_NOW:
      return {
        ...state,
        isCalling: true
      }
    case CALL_ERROR:
      return {
        ...state,
        isCalling: false,
        error: action.error
      }
    case CALL_SENT:
      return {
        ...state,
        isCalling: false
      }
    case PHONE_PREFS_SUBMIT:
      return {
        ...state,
        isSubmittingPhonePrefs: true
      }
    case PHONE_PREFS_SUBMITTED:
      return {
        ...state,
        isSubmittingPhonePrefs: false
      }
    case PHONE_PREFS_ERROR:
      return {
        ...state,
        isSubmittingPhonePrefs: false,
        error: action.error
      }
    default:
      return state;
  }
}