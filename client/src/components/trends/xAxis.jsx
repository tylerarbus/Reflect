import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

export class XAxis extends Component {

  componentDidMount() {
    const parseTime = d3.timeFormat('%a');

    const xAxis = d3.axisBottom(this.props.xScale)
        .ticks(7)
        .tickFormat(d => (parseTime(new Date(2017, 0, d + 2))));

    d3.select('.xAxis')
        .attr('transform', `translate(0, ${this.props.height})`)
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
    height: state.trends.height
  }
);

XAxis.propTypes = {
  xScale: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(XAxis);
