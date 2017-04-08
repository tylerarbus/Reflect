// import http client 

export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export const REQUEST_ENTRIES = 'REQUEST_ENTRIES';

export function fetchEntries() {
  return dispatch => {
    dispatch(requestEntries());
    return fetch('/api/entries')
    // assuming that response is JSON
      .then(response => dispatch(receiveEntries(response)))
      .catch(error => console.error(error));
  }
}

function receiveEntries(entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries: JSON.parse(entries),
    receivedAt: Date.now(),
    isFetching: false
  }
}

function requestEntries() {
  return {
    type: REQUEST_ENTRIES,
    isFetching: true
  }
}