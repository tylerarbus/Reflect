import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import XAxis from './xAxis.jsx';
import YAxis from './yAxis.jsx';
import Line from './Line.jsx';
import Area from './Area.jsx';

const Chart = ({ xScale, yScale, transformedData }) => (
  <g>
    {xScale && yScale && transformedData &&
      <g>
        <XAxis />
        <YAxis />
        <Line />
        <Area />
      </g>
    }
  </g>
);

const mapStateToProps = state => (
  {
    xScale: state.trends.xScale,
    yScale: state.trends.yScale,
    transformedData: state.trends.transformedData
  }
);

Chart.propTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  transformedData: PropTypes.arrayOf(PropTypes.object)
};

Chart.defaultProps = {
  xScale: null,
  yScale: null,
  transformedData: null
};

export default connect(mapStateToProps)(Chart);
