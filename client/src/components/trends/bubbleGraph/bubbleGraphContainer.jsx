import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import Bubbles from './Bubbles.jsx';
import ChartOptions from '../chart/ChartOptions.jsx';
import { setBubbleData, setBubbleView } from '../../../actions/trends.js';
import { getKeywordData } from './bubbleUtils.js';

const defaultFilterOptions = [['All History', 0], ['Last Week', 1], ['Last Month', 2]];

export class BubbleGraphContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOptions: defaultFilterOptions
    }
  }

  componentDidMount() {
    const { width, height, margin, rawData, dispatchBubbleData } = this.props;

    const keywordData = getKeywordData(rawData, width, height);

    d3.select('.bubbleChart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

    d3.select('.bubbleChartContainer')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    dispatchBubbleData(keywordData);
  }

  handleViewChange(e) {
    dispatch()
  }

  render() {
    const { width, height, keywordData, dispatchBubbleView } = this.props;

    return (
      <div>
        <ChartOptions 
          handleViewChange={dispatchBubbleView}
          handleFilterChange={console.log('hmm')}
          filterOptions={this.state.filterOptions}
        />
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
    dispatchBubbleData: (data) => dispatch(setBubbleData(data)),
    dispatchBubbleView: () => dispatch(setBubbleView())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(BubbleGraphContainer);