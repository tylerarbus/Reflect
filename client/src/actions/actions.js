// import http client 

export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';

export function fetchEntries() {
  return dispatch => {
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
    receivedAt: Date.now()
  }
}