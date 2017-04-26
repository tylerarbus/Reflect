import React from 'react';
import PropTypes from 'prop-types';

const ChartOptions = ({ handleViewChange, filterOptions }) => (
  <div>
    View Mode:
    <select
      className="ui fluid search dropdown"
      style={{ width: '200px' }}
      onChange={handleViewChange}
    >
      <option className="item" value="0">Top Keywords</option>
      <option className="item" value="1">By Emotion</option>
    </select>
    <br />
  </div>
)

export default ChartOptions;