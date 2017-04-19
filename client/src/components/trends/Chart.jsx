import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

import { setXScale, setYScale } from '../../actions/trends.js';
import XAxis from './xAxis.jsx';
import YAxis from './yAxis.jsx';
import Line from './Line.jsx';
import Area from './Area.jsx';

export class Chart extends Component {

  componentDidMount() {
    d3.select('.chart')
        .attr('width', this.props.width + this.props.margin.left + this.props.margin.right)
        .attr('height', this.props.height + this.props.margin.top + this.props.margin.bottom);

    d3.select('.chartContainer')
        .attr('transform', `translate(${this.props.margin.left},${this.props.margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, 6])
        .range([0, this.props.width]);

    const yScale = d3.scaleLinear()
        .domain([-1, 1])
        .range([this.props.height, 0]);

    this.props.dispatchXScale(xScale);
    this.props.dispatchYScale(yScale);
  }

  render() {
    return (
      <svg className="chart" >
        <g className="chartContainer">
          {this.props.xScale && this.props.yScale &&
            <g>
              <XAxis />
              <YAxis />
              <Line />
              <Area />
            </g>
          }
        </g>
      </svg>
    );
  }
}

const mapStateToProps = state => (
  {
    width: state.trends.width,
    height: state.trends.height,
    margin: state.trends.margin,
    xScale: state.trends.xScale,
    yScale: state.trends.yScale
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchXScale: xScale => dispatch(setXScale(xScale)),
    dispatchYScale: yScale => dispatch(setYScale(yScale))
  }
);

Chart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.objectOf(PropTypes.number).isRequired,
  dispatchXScale: PropTypes.func.isRequired,
  dispatchYScale: PropTypes.func.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func
};

Chart.defaultProps = {
  xScale: null,
  yScale: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
