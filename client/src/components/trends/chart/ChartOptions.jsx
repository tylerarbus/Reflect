import React from 'react';
import PropTypes from 'prop-types';

const ChartOptions = ({ handleViewChange, handleFilterChange, filterOptions }) => (
  <div>
    View Mode:
    <select
      className="ui fluid search dropdown"
      style={{ width: '200px' }}
      onChange={handleViewChange}
    >
      <option className="item" value="0">By Week</option>
      <option className="item" value="1">By Month</option>
    </select>
    <br />
    Filter data set:
    <select
      className="ui fluid search dropdown"
      style={{ width: '200px' }}
      onChange={handleFilterChange}
    >
      {filterOptions.map(label => (
        <option
          className="item"
          value={label[1]}
          key={Math.random()}
        >
          {label[0]}
        </option>
      ))}
    </select>
  </div>
);

ChartOptions.propTypes = {
  handleViewChange: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  filterOptions: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default ChartOptions;
