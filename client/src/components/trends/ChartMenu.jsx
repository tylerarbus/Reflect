import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ChartMenu = ({ charts, active, handleViewChange }) => (
  <div className="ui center aligned container">
    <div className="ui compact menu">
      {charts.map(chart => (
        <a 
          className={chart === active ? "active item" : "item"}
          onClick={handleViewChange}
        >
          {chart}
        </a>
      ))}
    </div>
  </div>
)

export default ChartMenu;