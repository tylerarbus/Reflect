export const CALLING_NOW = 'CALLING_NOW';
export const CALL_ERROR = 'CALL_ERROR';
export const CALL_SENT = 'CALL_SENT';

const callingNow = () => (
  {
    type: CALLING_NOW
  }
);

const callError = error => (
  {
    type: CALL_ERROR,
    error
  }
);

const callSent = () => (
  { type: CALL_SENT }
);

export const makeCall = () => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('reflective_token')}`
    }
  };

  return (dispatch) => {
    dispatch(callingNow());
    return fetch('api/calling/call', config)
      .then((response) => {
        if (response.ok) {
          dispatch(callSent());
        } else {
          throw new Error('Calling Error');
        }
      })
      .catch((error) => {
        dispatch(callError(error));
      });
  };
};
