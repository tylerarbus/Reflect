export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHED_DATA = 'FETCHED_DATA';
export const SET_CONTAINER_SIZE = 'SET_CONTAINER_SIZE';
export const SET_CHART_VIEW = 'SET_CHART_VIEW';
export const SET_CHART_DATA = 'SET_CHART_DATA';

export function fetchingData() {
  return {
    type: 'FETCHING_DATA'
  };
}

export function receivedData(results) {
  return {
    type: 'FETCHED_DATA',
    sentimentData: results
  };
}

export function fetchData() {
  const config = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('reflective_token')}`
    }
  };
  return (dispatch) => {
    dispatch(fetchingData());
    return fetch('/nlp', config)
      .then(results => (
        results.json()
      ))
      .then(sentimentData => dispatch(receivedData(sentimentData)))
      .catch(error => console.log('error handling TBD', error));
  };
}

export function setContainerSize(margin, width, height) {
  return {
    type: 'SET_CONTAINER_SIZE',
    margin,
    width,
    height
  };
}

export function setChartData(xScale, yScale, transformedData, chartView) {
  return {
    type: 'SET_CHART_DATA',
    xScale,
    yScale,
    transformedData,
    chartView
  };
}
