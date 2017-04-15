import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

export class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        
    const totalLength = path.node().getTotalLength();
    
    path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(750)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);
  }

  shouldComponentUpdate() {
    return false;
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