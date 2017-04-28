import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEntries, setDisplayMonth, setActiveMonth, deleteEntry } from './entries.actions.js';
import EntryList from './EntryList.jsx';
import Sidebar from './Sidebar.jsx';
import { NoResults, Searching, Welcome, LoadingEntries } from './Placeholders.jsx';
import { isInViewport, toMonthName } from './utils.js';

export class EntriesIndex extends Component {
  constructor(props) {
    super(props);

    this.onMonthClick = this.onMonthClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.onDeleteEntry = this.onDeleteEntry.bind(this);
  }

  componentDidMount() {
    const { dispatchGetEntries, userId } = this.props;
    dispatchGetEntries(userId);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onDeleteEntry(entry) {
    const { dispatchDeleteEntry } = this.props;
    dispatchDeleteEntry(entry);
  }

  onMonthClick(month) {
    const { dispatchSetDisplayMonth } = this.props;
    dispatchSetDisplayMonth(month);
  }

  handleScroll() {
    const { dispatchSetActiveMonth, activeMonth } = this.props;
    const dates = document.getElementsByClassName('date');
    const dateKeys = Object.keys(dates).filter(index => isInViewport(dates[index]));
    const topVisibleDate = new Date(dates[dateKeys[0]].textContent);
    const topVisibleMonth = `${topVisibleDate.getFullYear()}${toMonthName[topVisibleDate.getMonth()]}`;
    if (activeMonth !== topVisibleMonth) {
      dispatchSetActiveMonth(topVisibleMonth);
    }
  }

  render() {
    const { entries, byDate, activeMonth, isSearching, searchResults, isFetchingSearch, isFetchingEntries } = this.props;

    return (
      <div className="ui centered grid container">
        { entries.length !== 0 &&
          <Sidebar
            byDate={byDate}
            onMonthClick={this.onMonthClick}
            active={activeMonth}
          />
        }
        { !isSearching && isFetchingEntries &&
          <LoadingEntries />
        }
        { !isSearching && !isFetchingEntries && entries.length === 0 &&
          <Welcome />
        }
        { !isSearching && !isFetchingEntries && entries.length > 0 &&
          <EntryList
            entries={entries}
            onDelete={this.onDeleteEntry}
          />
        }
        { isSearching && isFetchingSearch &&
          <Searching />
        }
        { isSearching && !isFetchingSearch && searchResults.length === 0 &&
          <NoResults />
        }
        { isSearching && !isFetchingSearch && searchResults.length > 0 &&
          <EntryList
            entries={searchResults.map(result => (result._source))}
            onDelete={this.onDeleteEntry}
            numSearchResults={searchResults.length}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    userId: state.user.id,
    entries: state.entries.displayedEntries,
    byDate: state.entries.byDate,
    activeMonth: state.entries.activeMonth,
    isSearching: state.search.isSearching,
    searchResults: state.search.results,
    isFetchingSearch: state.search.isFetching,
    isFetchingEntries: state.entries.isFetching
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchGetEntries: () => dispatch(fetchEntries()),
    dispatchSetDisplayMonth: month => dispatch(setDisplayMonth(month)),
    dispatchSetActiveMonth: month => dispatch(setActiveMonth(month)),
    dispatchDeleteEntry: entry => dispatch(deleteEntry(entry))
  }
);

EntriesIndex.propTypes = {
  dispatchGetEntries: PropTypes.func.isRequired,
  dispatchSetDisplayMonth: PropTypes.func.isRequired,
  dispatchSetActiveMonth: PropTypes.func.isRequired,
  dispatchDeleteEntry: PropTypes.func.isRequired,
  userId: PropTypes.number,
  entries: PropTypes.arrayOf(PropTypes.object),
  activeMonth: PropTypes.string,
  byDate: PropTypes.objectOf(PropTypes.array),
  isSearching: PropTypes.bool.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object),
  isFetchingSearch: PropTypes.bool.isRequired,
  isFetchingEntries: PropTypes.bool.isRequired
};

EntriesIndex.defaultProps = {
  userId: null,
  entries: [],
  activeMonth: '',
  byDate: {},
  searchResults: null
};

export default connect(mapStateToProps, mapDispatchToProps)(EntriesIndex);

