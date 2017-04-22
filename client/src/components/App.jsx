import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEntries, setDisplayMonth, setActiveMonth, deleteEntry } from '../actions/entries.js';
import Entries from './Entries.jsx';
import Timeline from './Timeline.jsx';
import CallMeNow from './CallMeNow.jsx';
import { isInViewport, toMonthName } from '../utils.js';

export class App extends Component {
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
    const { dispatchSetActiveMonth } = this.props;
    const dates = document.getElementsByClassName('date');
    const dateKeys = Object.keys(dates).filter(index => isInViewport(dates[index]));
    const topVisibleDate = new Date(dates[dateKeys[0]].textContent);
    const topVisibleMonth = `${topVisibleDate.getFullYear()}${toMonthName[topVisibleDate.getMonth()]}`
    dispatchSetActiveMonth(topVisibleMonth);
  }

  render() {
    const { entries, byDate, activeMonth } = this.props;

    return (
      <div>
        <div className="ui three column grid container">
          <Timeline
            byDate={byDate}
            onMonthClick={this.onMonthClick}
            active={activeMonth}
          />
          <Entries
            entries={entries}
            onDelete={this.onDeleteEntry}
          />
          <CallMeNow />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    userId: state.user.id,
    entries: state.entries.displayedEntries,
    byDate: state.entries.byDate,
    activeMonth: state.entries.activeMonth
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

App.propTypes = {
  dispatchGetEntries: PropTypes.func.isRequired,
  dispatchSetDisplayMonth: PropTypes.func.isRequired,
  dispatchSetActiveMonth: PropTypes.func.isRequired,
  dispatchDeleteEntry: PropTypes.func.isRequired,
  userId: PropTypes.number,
  entries: PropTypes.arrayOf(PropTypes.object),
  months: PropTypes.objectOf(PropTypes.array),
  activeMonth: PropTypes.string
};

App.defaultProps = {
  userId: null,
  entries: [],
  months: {},
  activeMonth: ''
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

