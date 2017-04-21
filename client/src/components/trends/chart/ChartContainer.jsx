import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

import { transformWeekView, transformMonthView, filterWeekView, filterMonthView, generateArrayOfMonths } from './chartUtils';
import { setChartData } from '../../../actions/trends.js';

import ChartOptions from './ChartOptions.jsx';
import Chart from './Chart.jsx';

const defaultFilterOptions = [['All History', 0], ['Last Week', 1], ['Last Month', 2]];

export class ChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: defaultFilterOptions
    };

    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    const transformedData = transformWeekView(this.props.rawData);

    this.newChartData(this.props.chartView, transformedData);

    d3.select('.chart')
        .attr('width', this.props.width + this.props.margin.left + this.props.margin.right)
        .attr('height', this.props.height + this.props.margin.top + this.props.margin.bottom);

    d3.select('.chartContainer')
        .attr('transform', `translate(${this.props.margin.left},${this.props.margin.top})`);
  }

  newChartData(chartView, transformedData) {
    const yScale = d3.scaleLinear()
          .domain([-1, 1])
          .range([this.props.height, 0]);
    let xScale;
    if (chartView === '0') {
      xScale = d3.scaleLinear()
          .domain([0, 6])
          .range([0, this.props.width]);
    } else {
      const days = transformedData.length;
      xScale = d3.scaleLinear()
          .domain([1, days])
          .range([0, this.props.width]);
    }
    this.props.dispatchChartData(xScale, yScale, transformedData, chartView);
  }

  handleViewChange(e) {
    const newFilterOptions = e.target.value === '0' ? defaultFilterOptions : generateArrayOfMonths(this.props.rawData);
    this.setState({
      filterOptions: newFilterOptions
    });
    this.handleFilterChange({
      target: {
        value: newFilterOptions[0][1].toString()
      }
    }, e.target.value);
  }

  handleFilterChange(e, chartView = this.props.chartView) {
    let filteredData;
    let transformedData;
    if (chartView === '0') {
      filteredData = filterWeekView(e.target.value, this.props.rawData);
      transformedData = transformWeekView(filteredData);
    } else {
      filteredData = filterMonthView(e.target.value, this.props.rawData);
      transformedData = transformMonthView(filteredData, e.target.value);
    }
    this.newChartData(chartView, transformedData);
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
            <Chart />
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
    rawData: state.trends.rawData,
    chartView: state.trends.chartView
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchChartData: (xScale, yScale, transformedData, chartView) => dispatch(
      setChartData(xScale, yScale, transformedData, chartView)
    )
  }
);

ChartContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.objectOf(PropTypes.number).isRequired,
  dispatchChartData: PropTypes.func.isRequired,
  rawData: PropTypes.arrayOf(PropTypes.object).isRequired,
  chartView: PropTypes.string.isRequired
};

ChartContainer.defaultProps = {
  chartView: '0'
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartContainer);
