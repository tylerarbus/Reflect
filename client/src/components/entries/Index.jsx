import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { newSearch, endSearch } from './search/search.actions.js';

import JournalView from './JournalView.jsx';
import SearchView from './search/SearchView.jsx';

const EntriesIndex = props => (
  <div>
    <br />
    <div className="ui icon input" style={{ marginLeft: '250px' }}>
      <input
        placeholder="Search..."
        type="text"
        onChange={props.dispatchNewSearch}
        value={props.query}
      />
      {!props.isSearching &&
        <i className="search icon" />
      }
      {props.isSearching &&
        <i
          className="circular remove link icon"
          onClick={props.dispatchEndSearch}
        />
      }
    </div>
    {!props.isSearching &&
      <JournalView />
    }
    {props.isSearching &&
      <SearchView />
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

EntriesIndex.propTypes = {
  dispatchEndSearch: PropTypes.func.isRequired,
  dispatchNewSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EntriesIndex);
