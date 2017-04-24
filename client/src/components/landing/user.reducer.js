import { USER_SUBMIT_EMAIL, RECEIVE_USER_INFO, REQUEST_USER_INFO } from './user.actions.js';
import { LOGIN_SUBMIT, LOGIN_ERROR, LOGIN_SUCCESSFUL } from './login.actions.js';

const initialState = {
  id: null,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  isLoggingIn: false,
  isSubmittingPhonePrefs: false,
  fetchingUserInfo: false,
  error: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUBMIT_EMAIL:
      return {
        ...state,
        email: action.email
      };
    case REQUEST_USER_INFO:
      return {
        ...state,
        fetchingUserInfo: action.isFetching
      };
    case RECEIVE_USER_INFO:
      return {
        ...state,
        id: action.id,
        firstName: action.firstName,
        lastName: action.lastName,
        phone: action.phone,
        fetchingUserInfo: action.isFetching
      };
    case LOGIN_SUBMIT:
      return {
        ...state,
        isLoggingIn: true
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        error: action.error
      };
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
      };
    default:
      return state;
  }
};

export default user;
