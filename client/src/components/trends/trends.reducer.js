import { FETCHING_DATA, FETCHED_DATA, SET_CONTAINER_SIZE, SET_CHART_DATA, SET_BUBBLE_DATA, SET_BUBBLE_VIEW, SET_EMOTION_CENTERS } from './trends.actions.js';

const initialState = {
  isFetching: true,
  chartView: '0',
  keywordData: [],
  emotionView: false,
  emotionCenters: {}
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
    case SET_BUBBLE_DATA:
      return {
        ...state,
        keywordData: action.keywordData
      };
    case SET_BUBBLE_VIEW:
      return {
        ...state,
        emotionView: !state.emotionView
      };
    case SET_EMOTION_CENTERS:
      return {
        ...state,
        emotionCenters: action.emotionCenters
      }
    default:
      return state;
  }
};

export default trends;
