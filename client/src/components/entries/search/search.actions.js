export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';
export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const END_SEARCH = 'END_SEARCH';

const requestSearch = query => (
  {
    type: REQUEST_SEARCH,
    query
  }
);

const receiveSearch = results => (
  {
    type: RECEIVE_SEARCH,
    results,
    receivedAt: Date.now()
  }
);

export const newSearch = (e) => {
  const query = e.target.value;
  const config = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem('reflective_token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  };
  
  return (dispatch) => {
    dispatch(requestSearch(query));
    return fetch('/search', config)
      .then(response => response.json())
      .then((responseJSON) => {
        dispatch(receiveSearch(responseJSON.hits));
      })
      .catch(error => console.error(error));
  };
};

export const endSearch = () => (
  {
    type: END_SEARCH
  }
);
