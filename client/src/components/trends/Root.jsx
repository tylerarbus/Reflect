import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchData, setContainerSize, setTransformedData } from '../../actions/trends.js';
import Chart from './Chart.jsx';

export class Trends extends Component {

  componentDidMount() {
    this.props.dispatchFetchData();

    const margin = { top: 20, right: 20, bottom: 30, left: 70 };
    const width = this.refs.container.offsetWidth - 70 - margin.top - margin.bottom;
    const height = 500 - margin.top - margin.bottom;

    this.props.dispatchContainerSize(margin, width, height);
  }

  componentDidUpdate() {
    if (this.props.rawData && !this.props.transformedData) {
      const transformedData = this.transformData(this.props.rawData);
      this.props.dispatchTransformedData(transformedData);
    }
  }

  transformData(rawData) {
    const transformedData = [];
    for (let i = 0; i < 7; i += 1) {
      transformedData.push({
        value: 0,
        day: i,
        counter: 0
      });
    }

    rawData.forEach((entry) => {
      const entryDay = new Date(entry.created).getDay();
      transformedData[entryDay].value += entry.value;
      transformedData[entryDay].counter += 1;
    });

    transformedData.forEach(entry => {
      if (entry.counter === 0) {
        entry.value = 0.5;
      } else {
        entry.value = entry.value / entry.counter;
      }
    });
    return transformedData;
  }

  filterChart(value) {
    const numDaysBetween = (d1, d2) => {
      const diff = Math.abs(d1.getTime() - d2.getTime());
      return diff / (1000 * 60 * 60 * 24);
    };
    const today = new Date();
    const filteredData = this.props.rawData.filter((entry) => {
      const entryDate = new Date(entry.created);
      if (value === '1') {
        return numDaysBetween(today, entryDate) <= 7;
      } else if (value === '2') {
        return numDaysBetween(today, entryDate) <= 30;
      }
      return true;
    });

    this.props.dispatchTransformedData(this.transformData(filteredData));
  }

  render() {
    return (
      <div>
        <div className="ui container segment" ref="container">
          {this.props.transformedData && this.props.width &&
            <div>
              <select
                className="ui fluid search dropdown" style={{ width: '200px' }}
                onChange={(e) => { this.filterChart(e.target.value); }}
              >
                <option className="item" value="0">All History</option>
                <option className="item" value="1">Last Week</option>
                <option className="item" value="2">Last Month</option>
              </select>
              <Chart />
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    rawData: state.trends.rawData,
    transformedData: state.trends.transformedData,
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
    },
    dispatchTransformedData: transformedData => dispatch(setTransformedData(transformedData))
  }
);

Trends.propTypes = {
  dispatchFetchData: PropTypes.func.isRequired,
  dispatchContainerSize: PropTypes.func.isRequired,
  dispatchTransformedData: PropTypes.func.isRequired,
  rawData: PropTypes.arrayOf(PropTypes.object),
  transformedData: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.number
};

Trends.defaultProps = {
  rawData: null,
  transformedData: null,
  width: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Trends);
