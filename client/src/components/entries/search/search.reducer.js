import { RECEIVE_SEARCH, REQUEST_SEARCH, END_SEARCH } from './search.actions.js';

const initialState = {
  results: [],
  receivedAt: '',
  isFetching: false,
  isSearching: false,
  query: ''
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SEARCH:
      return {
        ...state,
        results: action.results,
        receivedAt: action.receivedAt,
        isFetching: false
      };
    case REQUEST_SEARCH:
      return {
        ...state,
        isFetching: true,
        isSearching: true,
        query: action.query
      };
    case END_SEARCH:
      return {
        ...state,
        isFetching: false,
        receivedAt: '',
        results: [],
        isSearching: false,
        query: ''
      };
    default:
      return state;
  }
};

export default search;
