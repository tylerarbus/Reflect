import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEntries, setDisplayMonth, setActiveMonth, deleteEntry } from './entries.actions.js';
import EntryList from './EntryList.jsx';
import Timeline from './Timeline.jsx';
import CallMeNow from './calling/CallMeNow.jsx';
import Welcome from './Welcome.jsx';
import { isInViewport, toMonthName } from './utils.js';

export class JournalView extends Component {
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
    const { entries, byDate, activeMonth } = this.props;

    return (
      <div className="ui centered grid container">
          <Timeline
            byDate={byDate}
            onMonthClick={this.onMonthClick}
            active={activeMonth}
          />
          { this.props.entries.length === 0 &&
            <Welcome />
          }
          { this.props.entries.length > 0 &&
            <EntryList
              entries={entries}
              onDelete={this.onDeleteEntry}
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

JournalView.propTypes = {
  dispatchGetEntries: PropTypes.func.isRequired,
  dispatchSetDisplayMonth: PropTypes.func.isRequired,
  dispatchSetActiveMonth: PropTypes.func.isRequired,
  dispatchDeleteEntry: PropTypes.func.isRequired,
  userId: PropTypes.number,
  entries: PropTypes.arrayOf(PropTypes.object),
  activeMonth: PropTypes.string,
  byDate: PropTypes.objectOf(PropTypes.array)
};

JournalView.defaultProps = {
  userId: null,
  entries: [],
  activeMonth: '',
  byDate: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(JournalView);

