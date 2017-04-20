import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

import { transformData, filterData, generateArrayOfMonths } from './trendsUtils';
import { setXScale, setYScale, setTransformedData, setChartView } from '../../actions/trends.js';

import ChartOptions from './ChartOptions.jsx';
import XAxis from './xAxis.jsx';
import YAxis from './yAxis.jsx';
import Line from './Line.jsx';
import Area from './Area.jsx';

const defaultFilterOptions = [['All History', 0], ['Last Week', 1], ['Last Month', 2]];

export class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: defaultFilterOptions
    };

    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    const transformedData = transformData(this.props.rawData);
    this.props.dispatchTransformedData(transformedData);

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

  handleViewChange(e) {
    this.props.dispatchChartView(e.target.value);
    const newFilterOptions = e.target.value === '0' ? defaultFilterOptions : generateArrayOfMonths(this.props.rawData);
    this.setState({
      filterOptions: newFilterOptions
    });
  }

  handleFilterChange(e) {
    const filteredData = filterData(e.target.value, this.props.rawData);
    this.props.dispatchTransformedData(transformData(filteredData));
  }

  render() {
    return (
      <div>
        <ChartOptions
          handleViewChange={this.handleViewChange}
          handleFilterChange={this.handleFilterChange}
          filterOptions={this.state.filterOptions}
        />
        <svg className="chart" >
          <g className="chartContainer">
            {this.props.xScale && this.props.yScale && this.props.transformedData &&
              <g>
                <XAxis />
                <YAxis />
                <Line />
                <Area />
              </g>
            }
          </g>
        </svg>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    width: state.trends.width,
    height: state.trends.height,
    margin: state.trends.margin,
    xScale: state.trends.xScale,
    yScale: state.trends.yScale,
    rawData: state.trends.rawData,
    transformedData: state.trends.transformedData,
    chartView: state.trends.chartView
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchXScale: xScale => dispatch(setXScale(xScale)),
    dispatchYScale: yScale => dispatch(setYScale(yScale)),
    dispatchTransformedData: transformedData => dispatch(setTransformedData(transformedData)),
    dispatchChartView: chartView => dispatch(setChartView(chartView))
  }
);

Chart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.objectOf(PropTypes.number).isRequired,
  dispatchXScale: PropTypes.func.isRequired,
  dispatchYScale: PropTypes.func.isRequired,
  dispatchTransformedData: PropTypes.func.isRequired,
  dispatchChartView: PropTypes.func.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  rawData: PropTypes.arrayOf(PropTypes.object).isRequired,
  transformedData: PropTypes.arrayOf(PropTypes.object)
};

Chart.defaultProps = {
  xScale: null,
  yScale: null,
  transformedData: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
