import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setContainerSize, setTransformedData } from '../../actions/trends.js';
import Chart from './Chart.jsx';

export class Trends extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchData());

    console.log('********', this.refs.container.offsetWidth)

    const margin = {top: 20, right: 20, bottom: 30, left: 70},
    width = this.refs.container.offsetWidth - 70 - margin.top - margin.bottom,
    height = 500 - margin.top - margin.bottom;

    dispatch(setContainerSize(margin, width, height));
  }

  componentDidUpdate() {
    const { dispatch } = this.props;

    if (this.props.trends.rawData && !this.props.trends.transformedData) {
      const transformedData = this.transformData(this.props.trends.rawData);
      dispatch(setTransformedData(transformedData));
    }
  }

  transformData(rawData) {
    const transformedData = [];
    for (let i = 0; i < 7; i++) {
      transformedData.push({
        value: 0,
        day: i,
        counter: 0
      })
    }

    rawData.forEach(entry => {
      const entryDay = new Date(entry.created).getDay();
      transformedData[entryDay].value += entry.value;
      transformedData[entryDay].counter++;
    })

    transformedData.forEach(entry => {
      if (entry.counter === 0) {
        entry.value = 0.5;
      } else {
        entry.value = entry.value / entry.counter;
      }
    })
    
    return transformedData;
  }

  filterChart(value) {
    const numDaysBetween = (d1, d2) => {
      const diff = Math.abs(d1.getTime() - d2.getTime());
      return diff / (1000 * 60 * 60 * 24);
    };
    const today = new Date();
    let filteredData = this.props.trends.rawData.filter(entry => {
      const entryDate = new Date(entry.created);
      if (value === '0') {
        return true;
      } else if (value === '1') {
        return numDaysBetween(today, entryDate) <= 7;
      } else if (value === '2') {
        return numDaysBetween(today, entryDate) <= 30;
      }
    })
    const { dispatch } = this.props;
    dispatch(setTransformedData(this.transformData(filteredData)));
  }

  render() {
    return (
      <div className="ui container segment" ref="container">
        {this.props.trends.transformedData && this.props.trends.width &&
          <div>
            <select className="ui fluid search dropdown" style={{width: "200px"}}
              onChange={(e) => {this.filterChart(e.target.value)}}>
              <option className="item" value="0">All History</option>
              <option className="item" value="1">Last Week</option>
              <option className="item" value="2">Last Month</option>
            </select>
            <Chart />
          </div>
        }
      </div>
    )
  }
}

  const mapStateToProps = state => {
    return {
      ...state
    }
  }

export default connect(mapStateToProps)(Trends);