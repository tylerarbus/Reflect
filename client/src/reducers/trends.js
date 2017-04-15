import { FETCHING_DATA, FETCHED_DATA, SET_CONTAINER_SIZE, SET_X_SCALE, SET_Y_SCALE, TRANSFORMED_DATA } from '../actions/trends.js';

const initialState = {
  isFetching: true
}

function trends (state = initialState, action) {
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
        rawData: action.sentimentData
      }
    case 'SET_CONTAINER_SIZE':
      return {
        ...state,
        margin: action.margin,
        width: action.width,
        height: action.height
      }
    case 'SET_X_SCALE':
      return {
        ...state,
        xScale: action.xScale
      }
    case 'SET_Y_SCALE':
      return {
        ...state,
        yScale: action.yScale
      }
    case 'TRANSFORMED_DATA':
      return {
        ...state,
        transformedData: action.transformedData
      }
    default:
      return state;
  }
}

export default trends;