import { FETCHING_DATA, FETCHED_DATA, SET_CONTAINER_SIZE, SET_CHART_DATA } from '../actions/trends.js';

const initialState = {
  isFetching: true,
  chartView: '0'
};

const trends = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        isFetching: true
      };
    case FETCHED_DATA:
      return {
        ...state,
        isFetching: false,
        rawData: action.sentimentData
      };
    case SET_CONTAINER_SIZE:
      return {
        ...state,
        margin: action.margin,
        width: action.width,
        height: action.height
      };
    case SET_CHART_DATA:
      return {
        ...state,
        xScale: action.xScale,
        yScale: action.yScale,
        transformedData: action.transformedData,
        chartView: action.chartView
      };
    default:
      return state;
  }
};

export default trends;
