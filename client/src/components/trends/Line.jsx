import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

export class Line extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const line = d3.line()
        .x(d => {
          return this.props.trends.xScale(d.day);
        })
        .y(d => { return this.props.trends.yScale(d.value); })
        .curve(d3.curveBasis);

    const path = d3.select(".line")
        .attr('d', line(this.props.trends.transformedData))
        .attr('class', 'line')
        .attr('fill', 'none')
        .style('stroke', 'steelblue')
        .style('stroke-width', '2px')    

  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {

    const line = d3.line()
        .x(d => {
          return nextProps.trends.xScale(d.day);
        })
        .y(d => { return nextProps.trends.yScale(d.value); })
        .curve(d3.curveBasis);

    const path = d3.select(".line")
        .transition()
        .duration(750)
        .attr('d', line(nextProps.trends.transformedData))

  }

  render() {
    return (
      <path className="line" />
    )
  }

}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Line);