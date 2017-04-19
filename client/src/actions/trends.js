export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHED_DATA = 'FETCHED_DATA';
export const SET_CONTAINER_SIZE = 'SET_CONTAINER_SIZE';
export const SET_X_SCALE = 'SET_X_SCALE';
export const SET_Y_SCALE = 'SET_Y_SCALE';
export const TRANSFORMED_DATA = 'TRANSFORMED_DATA';

export function fetchingData() {
  return {
    type: 'FETCHING_DATA',
  }
}

export function receivedData(results) {
  return {
    type: 'FETCHED_DATA',
    sentimentData: results,
  }
}

export function fetchData(user) {
  const config = {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('reflective_token')
    }
  };
  return dispatch => {
    dispatch(fetchingData())
    return fetch('/nlp', config)
      .then(results => {
        return results.json();
      })
      .then(sentimentData => dispatch(receivedData(sentimentData)))
      .catch(error => console.log('error handling TBD', error));
  }
}

export function setContainerSize(margin, width, height) {
  return {
    type: 'SET_CONTAINER_SIZE',
    margin,
    width,
    height
  }
}

export function setXScale(xScale) {
  return {
    type: 'SET_X_SCALE',
    xScale
  }
}

export function setYScale(yScale) {
  return {
    type: 'SET_Y_SCALE',
    yScale
  }
}

export function setTransformedData(transformedData) {
  return {
    type: 'TRANSFORMED_DATA',
    transformedData
  }
}