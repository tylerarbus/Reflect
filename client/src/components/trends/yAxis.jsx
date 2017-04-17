import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

export class YAxis extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const yAxis = d3.axisLeft(this.props.trends.yScale)
        .ticks(3)
        .tickFormat(d => {
          let label = 'Neutral';
          if (d === 0.5) { return label; }
          d > 0.5 ? label = 'More Happy' : label = 'Less Happy';
          return label;
        })

    d3.select(".yAxis")
        .call(yAxis);

  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <g className="yAxis" />
    )
  }

}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(YAxis);