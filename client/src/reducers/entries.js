import { SET_ACTIVE_MONTH, RECEIVE_ENTRIES, REQUEST_ENTRIES, SET_DISPLAY_MONTH, DELETING_ENTRY, DELETE_ENTRY } from '../actions/entries';
import { monthByYear } from '../utils.js';

const initialState = {
  entries: [],
  displayedMonth: null,
  displayedEntries: [],
  byDate: {},
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
        byDate: action.byDate,
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
        displayedEntries: state.entries.filter(entry => monthByYear(entry.created) === action.month)
      }
    case SET_ACTIVE_MONTH:
      return {
        ...state,
        activeMonth: action.month
      }
    case DELETING_ENTRY:
      return {
        ...state,
        isDeleting: action.isDeleting
      }
    case DELETE_ENTRY:
      return {
        ...state,
        displayedEntries: state.displayedEntries.filter(entry => entry.entry_id !== parseInt(action.entryId)),
        isDeleting: action.isDeleting
      }
  default:
    return state;
  }
}