import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

const createXAxis = ({ chartView, xScale, transformedData }) => {
  const parseTime = d3.timeFormat('%a');
  let xAxis;
  if (chartView === '0') {
    xAxis = d3.axisBottom(xScale)
        .ticks(7)
        .tickFormat(d => (parseTime(new Date(2017, 0, d + 2))));
  } else {
    xAxis = d3.axisBottom(xScale)
        .ticks(transformedData.length);
  }
  return xAxis;
};

export class XAxis extends Component {

  componentDidMount() {
    const xAxis = createXAxis(this.props);

    d3.select('.xAxis')
        .style('font', '12px lato')
        .attr('transform', `translate(0, ${this.props.height})`)
        .call(xAxis);

  }

  componentWillReceiveProps(nextProps) {
    let xAxis;
    if (this.props.transformedData !== nextProps.transformedData) {
      xAxis = createXAxis(nextProps);
    }
    d3.select('.xAxis')
        .transition()
        .duration(750)
        .call(xAxis);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <g className="xAxis" />
    );
  }

}

const mapStateToProps = state => (
  {
    xScale: state.trends.xScale,
    height: state.trends.height,
    chartView: state.trends.chartView,
    transformedData: state.trends.transformedData
  }
);

XAxis.propTypes = {
  transformedData: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(XAxis);
