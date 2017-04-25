import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import Bubbles from './Bubbles.jsx';
import ChartOptions from '../chart/ChartOptions.jsx';
import EmotionTitles from './EmotionTitles.jsx';
import { setBubbleData, setBubbleView } from '../../../actions/trends.js';
import { getKeywordData, emotionCenters, emotions } from './bubbleUtils.js';

const defaultFilterOptions = [['All History', 0], ['Last Week', 1], ['Last Month', 2]];

export class BubbleGraphContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOptions: defaultFilterOptions
    }

    this.handleViewChange = this.handleViewChange.bind(this);
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
    const { dispatchBubbleView } = this.props;
    dispatchBubbleView();
  }

  render() {
    const { width, height, margin, keywordData, dispatchBubbleView, emotionView } = this.props;

    return (
      <div>
        <ChartOptions 
          handleViewChange={this.handleViewChange}
          handleFilterChange={console.log('hmm')}
          filterOptions={this.state.filterOptions}
        />
        <svg className="bubbleChart" width={width} height={height}>
          <g className="bubbleChartContainer">
            {keywordData.length > 0 && <Bubbles />}
            {emotionView && <EmotionTitles width={width} height={height} margin={margin} emotions={emotions} centers={emotionCenters}/>}
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
    keywordData: state.trends.keywordData,
    emotionView:state.trends.emotionView
  }
)

const mapDispatchToProps = dispatch => (
  {
    dispatchBubbleData: (data) => dispatch(setBubbleData(data)),
    dispatchBubbleView: () => dispatch(setBubbleView())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(BubbleGraphContainer);