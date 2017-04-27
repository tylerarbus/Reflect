import { ACCOUNT_PAGE_SUBMIT, PHONE_VERIFY_SUBMIT, CREATING_USER, SIGN_UP_ERROR, USER_CREATED, VERIFYING_CODE, CODE_VERIFIED, CODE_ERROR, PHONE_PREFS_SUBMIT, PHONE_PREFS_SUBMITTED, PHONE_PREFS_ERROR, USER_SUBMIT_EMAIL } from './signup.actions.js';

const initialState = {
  isCreatingUser: false,
  errorMessage: null,
  accountPage: false,
  phoneVerificationPage: false,
  phonePreferencesPage: false,
  isVerifyingCode: false
};

const signup = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUBMIT_EMAIL:
      return {
        ...state,
        accountPage: true
      };
    case ACCOUNT_PAGE_SUBMIT:
      return {
        ...state,
        accountPage: false,
        phoneVerificationPage: true,
        phonePreferencesPage: false
      };
    case PHONE_VERIFY_SUBMIT:
      return {
        ...state,
        accountPage: false,
        phoneVerificationPage: false,
        phonePreferencesPage: true
      };
    case CREATING_USER:
      return {
        ...state,
        isCreatingUser: true
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isCreatingUser: false
      };
    case USER_CREATED:
      return {
        ...state,
        isCreatingUser: false,
        errorMessage: null
      };
    case VERIFYING_CODE:
      return {
        ...state,
        isVerifyingCode: true
      };
    case CODE_VERIFIED:
      return {
        ...state,
        isVerifyingCode: false
      };
    case CODE_ERROR:
      return {
        ...state,
        isVerifyingCode: false,
        errorMessage: action.error
      };
    case PHONE_PREFS_SUBMIT:
      return {
        ...state,
        isSubmittingPhonePrefs: true
      };
    case PHONE_PREFS_SUBMITTED:
      return {
        ...state,
        isSubmittingPhonePrefs: false,
        phonePreferencesPage: false
      };
    case PHONE_PREFS_ERROR:
      return {
        ...state,
        isSubmittingPhonePrefs: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default signup;
