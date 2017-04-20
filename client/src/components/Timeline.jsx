import React from 'react';
import PropTypes from 'prop-types';
import { monthToEnglish } from '../utils.js';


const Timeline = ({ months, onMonthClick, active }) => {

  const activeStyle = {'color': '#89EEB2', 'font-weight': 'bold'}

  return (
    <div className="four wide column">
      <div className="ui left vertical fixed menu visible borderless " style={{ top: '42' }}>
        <div className="item header">2017</div>
        {Object.keys(months).map(month =>
          <a className="item" style={monthToEnglish[month] === active ? activeStyle : {}} key={Math.random()} onClick={() => onMonthClick(month)}>
            {monthToEnglish[month]}
            <div className="ui label" key={Math.random()}>{months[month].length}</div>
          </a>
        )}
      </div>
    </div>
  )
};

Timeline.propTypes = {
  months: PropTypes.objectOf(PropTypes.array),
  onMonthClick: PropTypes.func.isRequired
};

Timeline.defaultProps = {
  months: {}
};

export default Timeline;



