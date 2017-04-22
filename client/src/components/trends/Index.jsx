import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchData, setContainerSize } from './trends.actions.js';
import ChartContainer from './chart/ChartContainer.jsx';
import BubbleGraphContainer from './bubbleGraph/bubbleGraphContainer.jsx';

const gridStyle = {
  marginTop: '14px'
};

export class Trends extends Component {

  componentDidMount() {
    this.props.dispatchFetchData();

    const margin = { top: 20, right: 20, bottom: 30, left: 70 };
    const width = this.refs.container.offsetWidth - 70 - margin.top - margin.bottom;
    const height = 500 - margin.top - margin.bottom;

    this.props.dispatchContainerSize(margin, width, height);
  }

  render() {
    return (
      <div style={gridStyle}>
        <div className="ui container segment" ref="container">
          {this.props.rawData && this.props.width &&
            <ChartContainer />
          }
        </div>
        <div className="ui container segment" ref="container">
          {this.props.rawData && this.props.width &&
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
    height: state.trends.height
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchFetchData: () => dispatch(fetchData()),
    dispatchContainerSize: (margin, width, height) => {
      dispatch(setContainerSize(margin, width, height));
    }
  }
);

Trends.propTypes = {
  dispatchFetchData: PropTypes.func.isRequired,
  dispatchContainerSize: PropTypes.func.isRequired,
  rawData: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.number
};

Trends.defaultProps = {
  rawData: null,
  width: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Trends);
