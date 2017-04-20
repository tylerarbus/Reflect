import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEntries, setDisplayMonth, setActiveMonth } from '../actions/entries.js';
import Entries from './Entries.jsx';
import Timeline from './Timeline.jsx';
import CallMeNow from './CallMeNow.jsx';
import { isInViewport, toMonthName } from '../utils.js';

export class App extends Component {
  constructor(props) {
    super(props);

    this.onMonthClick = this.onMonthClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { dispatchGetEntries, userId } = this.props;
    dispatchGetEntries(userId);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onMonthClick(month) {
    const { dispatchSetDisplayMonth } = this.props;
    dispatchSetDisplayMonth(month);
  }

  handleScroll() {
    const { dispatchSetActiveMonth } = this.props;
    const months = document.getElementsByClassName('month');
    const monthKeys = Object.keys(months).filter(index => isInViewport(months[index]));
    const topVisibleDate = new Date(months[monthKeys[0]].textContent);
    const topVisibleMonth = toMonthName[topVisibleDate.getMonth()];
    dispatchSetActiveMonth(topVisibleMonth);
  }

  render() {
    const { entries, months, activeMonth } = this.props;

    return (
      <div>
        <div className="ui three column grid container">
          <Timeline months={months} onMonthClick={this.onMonthClick} active={activeMonth} />
          <Entries entries={entries} />
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
    months: state.entries.months,
    activeMonth: state.entries.activeMonth
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchGetEntries: () => dispatch(fetchEntries()),
    dispatchSetDisplayMonth: month => dispatch(setDisplayMonth(month)),
    dispatchSetActiveMonth: month => dispatch(setActiveMonth(month))
  }
);

App.propTypes = {
  dispatchGetEntries: PropTypes.func.isRequired,
  dispatchSetDisplayMonth: PropTypes.func.isRequired,
  dispatchSetActiveMonth: PropTypes.func.isRequired,
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

