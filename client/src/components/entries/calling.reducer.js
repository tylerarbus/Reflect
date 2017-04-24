import { CALLING_NOW, CALL_ERROR, CALL_SENT } from './calling.actions.js';

const initialState = {
  isCalling: false,
  error: null
};

const calling = (state = initialState, action) => {
  switch (action.type) {
    case CALLING_NOW:
      return {
        ...state,
        isCalling: true
      };
    case CALL_ERROR:
      return {
        ...state,
        isCalling: false,
        error: action.error
      };
    case CALL_SENT:
      return {
        ...state,
        isCalling: false
      };
    default:
      return state;
  }
};

export default calling;
