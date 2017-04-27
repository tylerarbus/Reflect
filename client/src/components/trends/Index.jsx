import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchData, setContainerSize, setEmotionCenters, setCurrentChart } from './trends.actions.js';
import ChartContainer from './chart/ChartContainer.jsx';
import BubbleGraphContainer from './bubbleGraph/bubbleGraphContainer.jsx';
import ViewSelector from './ViewSelector.jsx';
import { getEmotionCenters } from './bubbleGraph/bubbleUtils.js';

const gridStyle = {
  marginTop: '14px'
};

const charts = ['Sentiment Chart', 'Keywords Bubble Chart'];

export class Trends extends Component {

  constructor(props) {
    super(props);

    this.handleViewChange = this.handleViewChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatchFetchData();

    const margin = { top: 20, right: 20, bottom: 30, left: 80 };
    const width = this.refs.container.offsetWidth - 70 - margin.top - margin.bottom;
    const height = 500 - margin.top - margin.bottom;

    this.props.dispatchContainerSize(margin, width, height);
    this.props.dispatchEmotionCenters(getEmotionCenters(width - margin.right));
  }

  handleViewChange(e) {
    const { dispatchCurrentChart } = this.props;
    dispatchCurrentChart(e.target.text);
  }

  render() {
    const { currentChart } = this.props;

    return (
      <div style={gridStyle}>
        {this.props.rawData &&
          <ViewSelector
            charts={charts}
            active={currentChart}
            handleViewChange={this.handleViewChange}
          />}
        <div className="ui container segment" ref="container">
          {this.props.rawData && this.props.width &&
            currentChart === 'Sentiment Chart' &&
            <ChartContainer />
          }
          {this.props.rawData && this.props.width &&
            currentChart === 'Keywords Bubble Chart' &&
            <BubbleGraphContainer />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    rawData: state.trends.rawData,
    margin: state.trends.margin,
    width: state.trends.width,
    height: state.trends.height,
    currentChart: state.trends.currentChart
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchFetchData: () => dispatch(fetchData()),
    dispatchContainerSize: (margin, width, height) => {
      dispatch(setContainerSize(margin, width, height));
    },
    dispatchEmotionCenters: (emotionCenters) => {
      dispatch(setEmotionCenters(emotionCenters));
    },
    dispatchCurrentChart: chart => dispatch(setCurrentChart(chart))
  }
);

Trends.propTypes = {
  dispatchFetchData: PropTypes.func.isRequired,
  dispatchContainerSize: PropTypes.func.isRequired,
  dispatchEmotionCenters: PropTypes.func.isRequired,
  rawData: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.number,
  currentChart: PropTypes.string.isRequired,
  dispatchCurrentChart: PropTypes.func.isRequired
};

Trends.defaultProps = {
  rawData: null,
  width: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Trends);
