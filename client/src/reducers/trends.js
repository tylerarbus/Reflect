import { FETCHING_DATA, FETCHED_DATA } from '../actions/trends.js';

const initialState = {
  isFetching: true
}

function trends (state=initialState, action) {
  switch (action.type) {
    case 'FETCHING_DATA':
      return {
        ...state,
        isFetching: true
      }
    case 'FETCHED_DATA':
      return {
        ...state,
        isFetching: false,
        sentimentData: action.sentimentData
      }
    default:
      return state;
  }
}

export default trends;