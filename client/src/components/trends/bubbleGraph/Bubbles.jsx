import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

export class Bubbles extends Component {
  constructor(props) {
    super(props);
    this.state = { g: null };

    this.renderBubbles = this.renderBubbles.bind(this);
    this.charge = this.charge.bind(this);

    this.simulation = d3.forceSimulation()
      .velocityDecay(0.2)
      .force("x", d3.forceX().strength(0.03).x(this.props.width / 2))
      .force("y", d3.forceY().strength(0.03).y(this.props.height / 2))
      .on('tick', this.ticked)
      .force('charge', d3.forceManyBody().strength(this.charge))
      .stop();

    // create a new simulation and add forces to it 
    // forces x and y use positioning forces to push our nodes towards center 
    // forceManyBody - simulates repulsion
  }

  componentDidMount() {
    const { keywordData } = this.props;
    this.renderBubbles(keywordData);
  }

  charge(d) {
    return -0.04 * Math.pow(d.r, 2.0);
  } 

  ticked() {
    const bubbles = d3.select('.bubbleChartContainer').selectAll('circle');
    const text = d3.select('.bubbleChartContainer').selectAll('text');

    bubbles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

    text
        .attr('x', d => d.x)
        .attr('y', d => d.y);
  }

  renderBubbles(data) {
    const { width, height, margin } = this.props;
    const forceStrength = 0.03;
    const bubbles = d3.select('.bubbleChartContainer').selectAll('circle')
      .data(data);

    bubbles.exit().remove()

    const bubblesE = bubbles.enter().append('circle')
        .classed('bubble', true)
        .attr('r', d => d.r)
        .attr('fill', '#89EEB2');

    const text = d3.select('.bubbleChartContainer').selectAll('text')
      .data(data).enter().append('text')
        .text(d => d.word)
        .attr('font-family', 'helvetica')
        .attr('font-size', '10px')
        .attr('text-anchor', 'middle')
        .attr('fill', 'black');

    this.simulation
      .nodes(data).alpha(1).restart()

  }


  render() {
    return (
      <g className="bubble" />
    )
  }
}

const mapStateToProps = state => (
  {
    width: state.trends.width,
    height: state.trends.height,
    margin: state.trends.margin,
    rawData: state.trends.rawData,
    keywordData: state.trends.keywordData
  }
)

const mapDispatchToProps = dispatch => (
  {
    dispatchBubbleData: () => dispatch(setBubbleData())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Bubbles);