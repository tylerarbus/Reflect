import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

export class YAxis extends Component {

  componentDidMount() {
    const yAxis = d3.axisLeft(this.props.yScale)
        .ticks(2)
        .tickFormat((d) => {
          let label = 'Neutral';
          if (d === 0) { return label; }
          label = d > 0 ? 'Positive' : 'Negative';
          return label;
        });

    d3.select('.yAxis')
        .style('font', '12px lato')
        .call(yAxis);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <g className="yAxis" />
    );
  }

}

const mapStateToProps = state => (
  {
    yScale: state.trends.yScale
  }
);

YAxis.propTypes = {
  yScale: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(YAxis);
