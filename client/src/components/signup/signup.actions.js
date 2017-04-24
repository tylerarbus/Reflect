import { push } from 'react-router-redux';

export const CREATING_USER = 'CREATING_USER';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const USER_CREATED = 'USER_CREATED';
export const ACCOUNT_PAGE_SUBMIT = 'ACCOUNT_PAGE_SUBMIT';
export const PHONE_VERIFY_SUBMIT = 'PHONE_VERIFY_SUBMIT';
export const VERIFYING_CODE = 'VERIFYING_CODE';
export const CODE_VERIFIED = 'CODE_VERIFIED';
export const CODE_ERROR = 'CODE_ERROR';
export const PHONE_PREFS_SUBMIT = 'PHONE_PREFS_SUBMIT';
export const PHONE_PREFS_SUBMITTED = 'PHONE_PREFS_SUBMITTED';
export const PHONE_PREFS_ERROR = 'PHONE_PREFS_ERROR';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';

const receiveUserInfo = userInfo => (
  {
    type: RECEIVE_USER_INFO,
    id: userInfo.user_id,
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    phone: userInfo.phone,
    isFetching: false
  }
);

export const accountPageSubmit = () => (
  {
    type: ACCOUNT_PAGE_SUBMIT
  }
);

const phoneVerifySubmit = () => (
  {
    type: PHONE_VERIFY_SUBMIT
  }
);

const creatingUser = () => (
  {
    type: CREATING_USER
  }
);

const signUpError = error => (
  {
    type: SIGN_UP_ERROR,
    errorMessage: error
  }
);

const userCreated = () => (
  {
    type: USER_CREATED
  }
);

export const createUser = (user) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      password: user.password
    })
  };

  return (dispatch) => {
    dispatch(creatingUser());
    return fetch('/api/auth/signup', config)
      .then(response => response.json())
      .then((responseJSON) => {
        localStorage.setItem('reflective_token', responseJSON.token);
        dispatch(receiveUserInfo(responseJSON.user));
        dispatch(userCreated());
        dispatch(accountPageSubmit());
      })
      .catch(error => dispatch(signUpError(error)));
  };
};

const verifyingCode = () => (
  {
    type: VERIFYING_CODE
  }
);

const codeVerified = () => (
  {
    type: CODE_VERIFIED
  }
);

const codeError = error => (
  {
    type: CODE_ERROR,
    error
  }
);

export const verifyPhoneCode = (code) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('reflective_token')}`
    },
    body: JSON.stringify({ verificationCode: code })
  };

  return (dispatch) => {
    dispatch(verifyingCode());
    return fetch('/api/auth/verify', config)
      .then((response) => {
        if (response.ok) {
          dispatch(codeVerified());
          dispatch(phoneVerifySubmit());
        } else {
          dispatch(codeError('Invalid Code'));
        }
      })
      .catch((error) => {
        dispatch(codeError(error));
      });
  };
};

const submittingPhonePrefs = () => (
  {
    type: PHONE_PREFS_SUBMIT
  }
);

const submittedPhonePrefs = () => (
  {
    type: PHONE_PREFS_SUBMITTED
  }
);

const phonePrefsError = err => (
  {
    type: PHONE_PREFS_ERROR,
    err
  }
);

export const phonePrefsSubmit = (prefs) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('reflective_token')}`
    },
    body: JSON.stringify(prefs)
  };

  return (dispatch) => {
    dispatch(submittingPhonePrefs());
    return fetch('/api/profile/callpreferences', config)
      .then((response) => {
        if (response.ok) {
          dispatch(submittedPhonePrefs());
          dispatch(push('/entries'));
        } else {
          throw new Error('Error saving phone preferences.');
        }
      })
      .catch((error) => {
        dispatch(phonePrefsError(error));
      });
  };
};

export const phonePrefsUpdate = (prefs) => {
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('reflective_token')}`
    },
    body: JSON.stringify(prefs)
  };

  return (dispatch) => {
    dispatch(submittingPhonePrefs());
    return fetch('/api/profile/callpreferences', config)
      .then((response) => {
        if (response.ok) {
          dispatch(submittedPhonePrefs());
        } else {
          throw new Error('Error updating phone preferences.');
        }
      })
      .catch((error) => {
        dispatch(phonePrefsError(error));
      });
  };
};
