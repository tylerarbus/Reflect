import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

export class XAxis extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    const parseTime = d3.timeFormat('%a');

    const xAxis = d3.axisBottom(this.props.trends.xScale)
        .ticks(7)
        .tickFormat(d => { return parseTime(new Date(2017, 0, d + 2)); })

    d3.select(".xAxis")
        .attr("transform", "translate(0," + this.props.trends.height + ")")
        .call(xAxis);

  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <g className="xAxis" />
    )
  }

}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(XAxis);