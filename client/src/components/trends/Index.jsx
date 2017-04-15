import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setContainerSize } from '../../actions/trends.js';
import Chart from './Chart.jsx';

export class Trends extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchData());

    const margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 700 - margin.top - margin.bottom,
    height = 500 - margin.top - margin.bottom;

    dispatch(setContainerSize(margin, width, height));
  }

  render() {

    return (
      <div>
        {this.props.trends.sentimentData && this.props.trends.width &&
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