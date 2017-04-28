import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { newSearch, endSearch } from './search.actions.js';

const SearchBar = ({ dispatchNewSearch, query, isSearching, dispatchEndSearch }) => (
  <div className="ui icon input">
    <input
      placeholder="Search..."
      type="text"
      onChange={dispatchNewSearch}
      value={query}
      onKeyDown={(e) => {
        if (e.keyCode === 27) {
          dispatchEndSearch();
        }
      }}
    />
    {!isSearching &&
      <i className="search icon" />
    }
    {isSearching &&
      <i
        className="circular remove link icon"
        onClick={dispatchEndSearch}
      />
    }
  </div>
);

const mapStateToProps = state => (
  {
    isSearching: state.search.isSearching,
    query: state.search.query
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchNewSearch: (query) => { dispatch(newSearch(query)); },
    dispatchEndSearch: () => { dispatch(endSearch()); }
  }
);

SearchBar.propTypes = {
  dispatchEndSearch: PropTypes.func.isRequired,
  dispatchNewSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
