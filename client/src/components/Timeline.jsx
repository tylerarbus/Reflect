import React from 'react';
import PropTypes from 'prop-types';
import { monthToEnglish, toMonthName } from '../utils.js';


const Timeline = ({ byDate, onMonthClick, active }) => {
  const activeStyle = { color: '#89EEB2', 'font-weight': 'bold' };

  const sortedYears = Object.keys(byDate).sort((a, b) => b > a);
  console.log('sorted years: ', sortedYears);
  return (
    <div className="four wide column">
      <div className="ui left vertical fixed menu visible borderless " style={{ top: '52' }}>
        {sortedYears.map(year =>
          <div>
            <div className="item header">{year}</div>
              <div>
                {Object.keys(byDate[year]).sort((a, b) => b > a).map(month =>
                  <a
                    className="item timelineMonth"
                    style={`${year}${toMonthName[month]}` === active ? activeStyle : {}}
                    key={month}
                    onClick={() => onMonthClick(month)}
                  >
                    {toMonthName[month]}
                    <div className="ui label">{byDate[year][month] && byDate[year][month].length}</div>
                  </a>
                )}
              </div>
          </div>
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

