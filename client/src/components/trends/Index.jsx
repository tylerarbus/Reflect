import React, { Component } from 'react';
import * as d3 from 'd3';

export class Trends extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    //define data structure
    const data = [
      {timestamp: 1, sentiment: Math.random()},
      {timestamp: 2, sentiment: Math.random()},
      {timestamp: 3, sentiment: Math.random()},
      {timestamp: 4, sentiment: Math.random()}
    ];

    const margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 560 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    const parseTime = d3.timeFormat('%a %d');

    const xScale = d3.scaleLinear()
        .range([0, width])
        .domain([1, 4]);

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 1]);

    const xAxis = d3.axisBottom(xScale)
        .ticks(5)
        .tickFormat(d => { return parseTime(d); })

    const yAxis = d3.axisLeft(yScale)
    
    const line = d3.line()
        .x(d => { return xScale(d.timestamp); })
        .y(d => { return yScale(d.sentiment); });

    const svg = d3.select('div')
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);
    
    svg.append('g')
        .call(yAxis);

    const path = svg.append('path')
        .attr('d', line(data))
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
      <div />
    )
  }

}

export default Trends;