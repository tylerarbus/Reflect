import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import Bubbles from './Bubbles.jsx';
import { setBubbleData } from '../../../actions/trends.js';
import { getKeywordData } from './bubbleUtils.js';

export class BubbleGraphContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { width, height, margin, rawData, dispatchBubbleData } = this.props;

    const keywordData = getKeywordData(rawData, width, height);

    d3.select('.bubbleChart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        //TODO: decide how want to calculate height and width

    d3.select('.bubbleChartContainer')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    dispatchBubbleData(keywordData);
  }

  render() {
    const { width, height, keywordData } = this.props;

    return (
      <div>
        <svg className="bubbleChart" width={width} height={height}>
          <g className="bubbleChartContainer">
            {keywordData.length > 0 && <Bubbles />}
          </g>
        </svg>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    width: state.trends.width,
    height: state.trends.height,
    margin: state.trends.margin,
    rawData: state.trends.rawData,
    keywordData: state.trends.keywordData
  }
)

const mapDispatchToProps = dispatch => (
  {
    dispatchBubbleData: (data) => dispatch(setBubbleData(data))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(BubbleGraphContainer);