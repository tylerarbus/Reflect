import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { setXScale, setYScale } from '../../actions/trends.js';

import XAxis from './xAxis.jsx';
import YAxis from './yAxis.jsx';
import Line from './Line.jsx';

export class Chart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    d3.select(".chart")
        .attr("width", this.props.trends.width + this.props.trends.margin.left + this.props.trends.margin.right)
        .attr("height", this.props.trends.height + this.props.trends.margin.top + this.props.trends.margin.bottom)

    d3.select(".chartContainer")
        .attr('transform', 'translate(' + this.props.trends.margin.left + ',' + this.props.trends.margin.top + ')');

    const xScale = d3.scaleLinear()
        .domain([0, 6])
        .range([0, this.props.trends.width]);

    const yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([this.props.trends.height, 0]);

    const { dispatch } = this.props;
    dispatch(setXScale(xScale));
    dispatch(setYScale(yScale));

  }

  render() {
    return (
      <svg className="chart" >
        <g className="chartContainer">
          {this.props.trends.xScale && this.props.trends.yScale &&
            <g>
              <XAxis />
              <YAxis />
              <Line />
            </g>
          }
        </g>
      </svg>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Chart);