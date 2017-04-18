import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

export class Area extends Component {

  componentDidMount() {
    const area = d3.area()
        .x(d => (this.props.xScale(d.day)))
        .y0(this.props.height)
        .y1(d => (this.props.yScale(d.value)))
        .curve(d3.curveBasis);

    d3.select('linearGradient')
      .attr('id', 'area-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', '0%')
      .attr('x2', 0)
      .attr('y2', '100%')
    .selectAll('stop')
      .data([
        { offset: '25%', color: '#ffff1c' },
        { offset: '100%', color: '#00c3ff' }
      ])
    .enter()
    .append('stop')
      .attr('offset', d => (d.offset))
      .attr('stop-color', d => (d.color))
      .attr('stop-opacity', '0.4');

    d3.select('.area')
        .data([this.props.transformedData])
        .attr('class', 'area')
        .attr('d', area)
        .attr('fill', 'url(#area-gradient)')
        .attr('stroke-width', '0px');
  }

  componentWillReceiveProps(nextProps) {
    const area = d3.area()
        .x(d => (nextProps.xScale(d.day)))
        .y0(nextProps.height)
        .y1(d => (nextProps.yScale(d.value)))
        .curve(d3.curveBasis);

    d3.select('.area')
        .data([nextProps.transformedData])
        .transition()
        .duration(750)
        .attr('class', 'area')
        .attr('d', area);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <g>
        <linearGradient />
        <path className="area" />
      </g>
    );
  }

}

const mapStateToProps = state => (
  {
    transformedData: state.trends.transformedData,
    yScale: state.trends.yScale,
    xScale: state.trends.xScale,
    height: state.trends.height
  }
);

Area.propTypes = {
  transformedData: PropTypes.arrayOf(PropTypes.object).isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(Area);
