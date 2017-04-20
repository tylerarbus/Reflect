import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

export class Line extends Component {

  componentDidMount() {
    const line = d3.line()
        .x(d => (
          this.props.xScale(d.day)
        ))
        .y(d => (
          this.props.yScale(d.sentiment)
        ))
        .curve(d3.curveBasis);

    d3.select('.line')
        .attr('d', line(this.props.transformedData))
        .attr('class', 'line')
        .attr('fill', 'none')
        .style('stroke', 'steelblue')
        .style('stroke-width', '2px');
  }

  componentWillReceiveProps(nextProps) {
    const line = d3.line()
        .x(d => (
          nextProps.xScale(d.day)
        ))
        .y(d => (
          nextProps.yScale(d.sentiment)
        ))
        .curve(d3.curveBasis);

    d3.select('.line')
        .transition()
        .duration(750)
        .attr('d', line(nextProps.transformedData));
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <path className="line" />
    );
  }

}

const mapStateToProps = state => (
  {
    xScale: state.trends.xScale,
    yScale: state.trends.yScale,
    transformedData: state.trends.transformedData
  }
);

Line.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  transformedData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps)(Line);
