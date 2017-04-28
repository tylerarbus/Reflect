import React from 'react';
import PropTypes from 'prop-types';

const labelStyle = { width: '200px', float: 'left', margin: '0 20px 20px' };
const spanStyle = { display: 'block', margin: '0 0 3px', font: 'lato', 'fontSize': '14px' };
const inputStyle = { width: '200px', padding: '5px', height: '30px' };

const ChartOptions = ({ handleViewChange, handleFilterChange, filterOptions }) => (
  <div>
    <label style={labelStyle}>
      <span style={spanStyle}>View Mode:</span>
      <select
        className="ui fluid search dropdown"
        style={inputStyle}
        onChange={handleViewChange}
      >
        <option className="item" value="0">By Week</option>
        <option className="item" value="1">By Month</option>
      </select>
    </label>
    <label style={labelStyle}>
      <span style={spanStyle}>Filter:</span>
      <select
        className="ui fluid search dropdown"
        style={inputStyle}
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
    </label>
  </div>
);

ChartOptions.propTypes = {
  handleViewChange: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  filterOptions: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default ChartOptions;
