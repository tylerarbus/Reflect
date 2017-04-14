export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHED_DATA = 'FETCHED_DATA';

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
  return dispatch => {
    dispatch(fetchingData())
    return fetch('/api/sentiment/data')
      .then(results => {
        return results.json();
      })
      .then(sentimentData => dispatch(receivedData(sentimentData)))
      .catch(error => console.log('error handling TBD'));
  }
}