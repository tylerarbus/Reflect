import React, { Component } from 'react';
import * as d3 from 'd3';

export class Bubbles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <g ref={this.onRef} className="bubbles" />
    )
  }
}

