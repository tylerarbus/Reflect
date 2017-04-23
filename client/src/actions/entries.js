import { entriesByDate } from '../utils.js';

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export const REQUEST_ENTRIES = 'REQUEST_ENTRIES';
export const SET_DISPLAY_MONTH = 'SET_DISPLAY_MONTH';
export const SET_ACTIVE_MONTH = 'SET_ACTIVE_MONTH';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const DELETING_ENTRY = 'DELETING_ENTRY';

const requestEntries = () => (
  {
    type: REQUEST_ENTRIES,
    isFetching: true
  }
);

const receiveEntries = (entries, byDate) => (
  {
    type: RECEIVE_ENTRIES,
    entries,
    byDate,
    receivedAt: Date.now(),
    isFetching: false
  }
);

export const fetchEntries = () => {
  const config = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('reflective_token')}`
    }
  };

  return (dispatch) => {
    dispatch(requestEntries());
    return fetch('/entries', config)
      .then(response => response.json())
      .then((responseJSON) => {
        const byDate = entriesByDate(responseJSON.entries);
        dispatch(receiveEntries(responseJSON.entries, byDate));
      })
      .catch(error => console.error(error));
  };
};

export const setDisplayMonth = month => (
  {
    type: SET_DISPLAY_MONTH,
    month
  }
);

export const setActiveMonth = month => (
  {
    type: SET_ACTIVE_MONTH,
    month
  }
);

const deletingEntry = () => (
  {
    type: DELETING_ENTRY,
    isDeleting: true
  }
);

export const entryDeleted = entryId => (
  {
    type: DELETE_ENTRY,
    entryId,
    isDeleting: false
  }
);

export const deleteEntry = (entryId) => {
  const config = {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem('reflective_token')}`
    }
  };

  return (dispatch) => {
    dispatch(deletingEntry());
    return fetch(`/entries/${entryId}`, config)
      .then(response => response.json())
      .then((responseJSON) => {
        dispatch(entryDeleted(responseJSON.entry_id));
      })
      .catch(error => console.error(error));
  };
};
