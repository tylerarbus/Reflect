import { push } from 'react-router-redux';

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const LOGIN_ERROR = 'LOGIN_ERROR';

const loginSubmit = () => ({ type: LOGIN_SUBMIT });

const loginSuccess = userInfo => (
  {
    type: LOGIN_SUCCESSFUL,
    id: userInfo.user_id,
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    phone: userInfo.phone,
    email: userInfo.email
  }
);

const loginError = error => ({ type: LOGIN_ERROR, error });

export const checkCredentials = (credentials) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  };

  return (dispatch) => {
    dispatch(loginSubmit());
    return fetch('/api/auth/login', config)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Invalid User/Password');
    })
    .then((responseJSON) => {
      localStorage.setItem('reflective_token', responseJSON.token);
      dispatch(loginSuccess(responseJSON.user));
      dispatch(push('/entries'));
    })
    .catch((error) => {
      dispatch(loginError(error.message));
    });
  };
};
