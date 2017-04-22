import React from 'react';
import PropTypes from 'prop-types';
import { toMonthName } from '../utils.js';


const Timeline = ({ byDate, onMonthClick, active }) => {
  const activeStyle = { color: '#89EEB2', fontWeight: 'bold' };

  const sortedYears = Object.keys(byDate).sort((a, b) => b > a);
  return (
    <div className="four wide column">
      <div className="ui left vertical fixed menu visible borderless " style={{ top: '52px' }}>
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
                  <div className="ui label">
                    {byDate[year][month] && byDate[year][month].length}
                  </div>
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
  onMonthClick: PropTypes.func.isRequired,
  active: PropTypes.string,
  byDate: PropTypes.objectOf(PropTypes.object)
};

Timeline.defaultProps = {
  active: '',
  byDate: {}
};

export default Timeline;

