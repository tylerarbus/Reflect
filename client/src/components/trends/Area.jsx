import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

export class Area extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const area = d3.area()  
        .x(d => { return this.props.trends.xScale(d.day); })  
        .y0(this.props.trends.height)          
        .y1(d => { return this.props.trends.yScale(d.value); })
        .curve(d3.curveBasis);

    d3.select("linearGradient")
      .attr("id", "area-gradient")      
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", "0%")
      .attr("x2", 0).attr("y2", "100%")
    .selectAll("stop")            
      .data([
        {offset: "25%", color: "#ffff1c"},
        {offset: "100%", color: "#00c3ff"}  
      ])   
    .enter().append("stop")      
      .attr("offset", d => { return d.offset; })  
      .attr("stop-color", d => { return d.color; })
      .attr("stop-opacity", "0.4");

    d3.select(".area")
        .data([this.props.trends.transformedData])
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", "url(#area-gradient)")
        .attr("stroke-width", "0px");

    }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {

    const area = d3.area()  
        .x(d => { return nextProps.trends.xScale(d.day); })  
        .y0(this.props.trends.height)          
        .y1(d => { return nextProps.trends.yScale(d.value); })
        .curve(d3.curveBasis);

    d3.select(".area")
        .data([nextProps.trends.transformedData])
        .transition()
        .duration(750)
        .attr("class", "area")
        .attr("d", area)
  }

  render() {
    return (
      <g>
        <linearGradient />
        <path className="area" />
      </g>
    )
  }

}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Area);