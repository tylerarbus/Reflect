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

    const margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 700 - margin.top - margin.bottom,
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

  render() {
    return (
      <div>
        {this.props.trends.transformedData && this.props.trends.width &&
          <Chart />
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