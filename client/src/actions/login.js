import { push } from 'react-router-redux';

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const LOGIN_ERROR = 'LOGIN_ERROR';

function loginSubmit() {
  return {
    type: LOGIN_SUBMIT
  }
}

function loginSuccess(userInfo) {
  return {
    type: LOGIN_SUCCESSFUL,
    id: userInfo.user_id,
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    phone: userInfo.phone,
    email: userInfo.email
  }
}

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  }
}

export function checkCredentials(credentials) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(credentials)
  };

  return dispatch => {
    dispatch(loginSubmit());
    return fetch('/api/auth/login', config)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid User/Password');
      }
    })
    .then(responseJSON => {
      localStorage.setItem('reflective_token', responseJSON.token);
      dispatch(loginSuccess(responseJSON.user));
      dispatch(push('/entries'));
    })
    .catch(error => {
      dispatch(loginError(error.message)); })
  }
}
