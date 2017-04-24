import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

export class Bubbles extends Component {
  constructor(props) {
    super(props);
    this.state = { g: null };

    this.renderBubbles = this.renderBubbles.bind(this);

    this.simulation = d3.forceSimulation()
     .force("x", d3.forceX().strength(0.03).x(this.props.width / 2))
     .force("y", d3.forceY().strength(0.03).y(this.props.height / 2))
     .on('tick', this.ticked)
     .force('charge', d3.forceManyBody().strength(-40))
     .stop();
  }

  componentDidMount() {
    const { keywordData } = this.props;
    this.renderBubbles(keywordData);
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
        .attr('r', d => d.r)//d.r)
        // .attr('cx', d => d.x + 50 - margin.right)
        // .attr('cy', d => d.y + 50 - margin.top)
        .attr('fill', '#89EEB2');

    const text = d3.select('.bubbleChartContainer').selectAll('text')
      .data(data).enter().append('text')
        // .attr('x', d => d.x + 50 - margin.right)
        // .attr('y', d => d.y + 50 - margin.top)
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