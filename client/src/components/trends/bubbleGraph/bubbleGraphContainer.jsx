import React, { Component } from 'react';
import * as d3 from 'd3';

export default class BubbleGraphContainer extends Component {

  render() {
    return (
      <div>
        <svg className="bubbleChart">
          <g className="bubbles" />
        </svg>
      </div>
    );
  }
}
