export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHED_DATA = 'FETCHED_DATA';
export const SET_CONTAINER_SIZE = 'SET_CONTAINER_SIZE';
export const SET_CHART_VIEW = 'SET_CHART_VIEW';
export const SET_CHART_DATA = 'SET_CHART_DATA';
export const SET_BUBBLE_DATA = 'SET_BUBBLE_DATA';

export const fetchingData = () => ({ type: FETCHING_DATA });

export const receivedData = results => (
  {
    type: FETCHED_DATA,
    sentimentData: results
  }
);

export const fetchData = () => {
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
};

export const setContainerSize = (margin, width, height) => (
  {
    type: 'SET_CONTAINER_SIZE',
    margin,
    width,
    height
  }
);

export const setChartData = (xScale, yScale, transformedData, chartView) => (
  {
    type: 'SET_CHART_DATA',
    xScale,
    yScale,
    transformedData,
    chartView
  }
);

export const setBubbleData = (keywordData) => (
{
  type: 'SET_BUBBLE_DATA',
  keywordData
}
)