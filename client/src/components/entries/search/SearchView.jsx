import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteEntry } from '../entries.actions.js';
import EntryList from '../EntryList.jsx';

const SearchView = props => (
  <div>
    {props.searchResults &&
      <EntryList
        entries={props.searchResults.map(result => (result._source))}
        onDelete={props.dispatchDeleteEntry}
      />
    }
  </div>
);

const mapDispatchToProps = dispatch => (
  {
    dispatchDeleteEntry: entry => dispatch(deleteEntry(entry))
  }
);

const mapStateToProps = state => (
  {
    searchResults: state.search.results
  }
);

SearchView.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.obj),
  dispatchDeleteEntry: PropTypes.func.isRequired
};

SearchView.defaultProps = {
  searchResults: null
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
