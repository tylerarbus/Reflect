import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Bubbles from './Bubbles.jsx';
import ChartOptions from './ChartOptions.jsx';
import EmotionTitles from './EmotionTitles.jsx';
import { setBubbleData, setBubbleView } from '../trends.actions.js';
import { getKeywordData } from './bubbleUtils.js';

export class BubbleGraphContainer extends Component {
  constructor(props) {
    super(props);

    this.handleViewChange = this.handleViewChange.bind(this);
  }

  componentDidMount() {
    const { width, height, margin, rawData, dispatchBubbleData } = this.props;

    const keywordData = getKeywordData(rawData);

    d3.select('.bubbleChart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    d3.select('.bubbleChartContainer')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    dispatchBubbleData(keywordData);
  }

  handleViewChange() {
    const { dispatchBubbleView } = this.props;
    dispatchBubbleView();
  }

  render() {
    const { width, height, keywordData, emotionView, emotionCenters } = this.props;

    return (
      <div>
        <ChartOptions
          handleViewChange={this.handleViewChange}
        />
        <svg className="bubbleChart" width={width} height={height}>
          <g className="bubbleChartContainer">
            {keywordData.length > 0 && <Bubbles />}
            { emotionView &&
              <EmotionTitles
                centers={emotionCenters}
              />
            }
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
    emotionView: state.trends.emotionView,
    emotionCenters: state.trends.emotionCenters
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchBubbleData: data => dispatch(setBubbleData(data)),
    dispatchBubbleView: () => dispatch(setBubbleView())
  }
);

BubbleGraphContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.objectOf(PropTypes.number).isRequired,
  rawData: PropTypes.arrayOf(PropTypes.object).isRequired,
  keywordData: PropTypes.arrayOf(PropTypes.object),
  emotionView: PropTypes.bool.isRequired,
  emotionCenters: PropTypes.objectOf(PropTypes.object).isRequired,
  dispatchBubbleData: PropTypes.func.isRequired,
  dispatchBubbleView: PropTypes.func.isRequired
};

BubbleGraphContainer.defaultProps = {
  keywordData: []
};

export default connect(mapStateToProps, mapDispatchToProps)(BubbleGraphContainer);
