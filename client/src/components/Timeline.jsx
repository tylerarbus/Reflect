import React from 'react';
import PropTypes from 'prop-types';
import { monthToEnglish } from '../utils.js';


const Timeline = ({ months, onMonthClick, active }) => {
  const activeStyle = { color: '#89EEB2', 'font-weight': 'bold' };

  return (
    <div className="four wide column">
      <div className="ui left vertical fixed menu visible borderless " style={{ top: '42' }}>
        <div className="item header">2017</div>
        {Object.keys(months).map(month =>
          <a
            className="item timelineMonth"
            style={monthToEnglish[month] === active ? activeStyle : {}}
            key={month}
            onClick={() => onMonthClick(month)}
          >
            {monthToEnglish[month]}
            <div className="ui label" key={months[month]}>{months[month].length}</div>
          </a>
        )}
      </div>
    </div>
  );
};

Timeline.propTypes = {
  months: PropTypes.objectOf(PropTypes.array),
  onMonthClick: PropTypes.func.isRequired,
  active: PropTypes.string
};

Timeline.defaultProps = {
  months: {},
  active: ''
};

export default Timeline;

