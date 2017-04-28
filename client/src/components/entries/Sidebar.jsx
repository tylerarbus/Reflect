import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './search/SearchBar.jsx';
import { toMonthName } from './utils.js';

const timelineStyle = {
  top: '66px',
  position: 'sticky'
};

const Sidebar = ({ byDate, onMonthClick, active, isSearching }) => {
  const activeStyle = { color: '#89EEB2', fontWeight: 'bold' };

  const sortedYears = Object.keys(byDate).sort((a, b) => b > a);
  return (
    <div className="four wide column" style={{ paddingLeft: '0px' }}>
      <div style={timelineStyle}>
        <SearchBar />
        {!isSearching &&
          <div
            className="ui left secondary vertical menu visible borderless"
          >
            {sortedYears.map(year =>
              <div key={year}>
                <div className="item header">{year}</div>
                <div>
                  {Object.keys(byDate[year]).sort((a, b) => b > a).map(month =>
                    <a
                      className="item timelineMonth"
                      style={`${year}${toMonthName[month]}` === active ? activeStyle : {}}
                      key={month}
                      onClick={() => onMonthClick(`${year}${toMonthName[month]}`)}
                    >
                      {toMonthName[month]}
                      <div className="ui circular black label">
                        {byDate[year][month] && byDate[year][month].length}
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => (
  {
    isSearching: state.search.isSearching
  }
);

Sidebar.propTypes = {
  onMonthClick: PropTypes.func.isRequired,
  active: PropTypes.string,
  byDate: PropTypes.objectOf(PropTypes.object),
  isSearching: PropTypes.bool.isRequired
};

Sidebar.defaultProps = {
  active: '',
  byDate: {}
};

export default connect(mapStateToProps)(Sidebar);

