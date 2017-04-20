import { SET_ACTIVE_MONTH, RECEIVE_ENTRIES, REQUEST_ENTRIES, SET_DISPLAY_MONTH } from '../actions/entries';

const initialState = {
  entries: [],
  displayedMonth: null,
  displayedEntries: [],
  months: [],
  activeMonth: null,
  receivedAt: '',
  isFetching: false
};

export default function entries(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return {
        ...state,
        entries: action.entries,
        months: action.months,
        displayedEntries: action.entries,
        receivedAt: action.receivedAt,
        isFetching: action.isFetching
      }
    case REQUEST_ENTRIES:
      return {
        ...state,
        isFetching: action.isFetching
      }
    case SET_DISPLAY_MONTH:
      return {
        ...state,
        displayedMonth: action.month,
        displayedEntries: state.entries.filter(entry => entry.created.split('-')[1] === action.month)
      }
    case SET_ACTIVE_MONTH:
      return {
        ...state,
        activeMonth: action.month
      }
  default:
    return state;
  }
}