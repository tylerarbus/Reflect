import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { checkBoundariesX, colorScale } from './bubbleUtils.js';

export class Bubbles extends Component {
  constructor(props) {
    super(props);
    this.state = { g: null };

    this.renderBubbles = this.renderBubbles.bind(this);
    this.charge = this.charge.bind(this);
    this.ticked = this.ticked.bind(this);

    this.simulation = d3.forceSimulation()
      .velocityDecay(0.2)
      .force("x", d3.forceX().strength(0.03).x(this.props.width / 2))
      .force("y", d3.forceY().strength(0.045).y(this.props.height / 2))
      .on('tick', this.ticked)
      .force('charge', d3.forceManyBody().strength(this.charge))
      .stop();
  }

  componentDidMount() {
    const { keywordData } = this.props;
    this.renderBubbles(keywordData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.emotionView !== this.props.emotionView) {
      this.regroupBubbles(nextProps.emotionView);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  charge(d) {
    return -0.04 * Math.pow(d.r, 2.0);
  } 

  ticked() {
    const { width, height, margin, emotionView, emotionCenters } = this.props;
    const bubbles = d3.select('.bubbleChartContainer').selectAll('circle');
    const text = d3.select('.bubbleChartContainer').selectAll('.bubbleText');

    if (emotionView) {
      bubbles
          .attr('cx', d => checkBoundariesX(d.x, d.r, emotionCenters[d.emotion]))
          .attr('cy', d => 35 + Math.min(d.y, height - margin.top));

      text
          .attr('x', d => checkBoundariesX(d.x, d.r, emotionCenters[d.emotion]))
          .attr('y', d => 35 + Math.min(d.y, height - margin.top));
    } else {
      bubbles
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)

      text
          .attr('x', d => d.x)
          .attr('y', d => d.y)
    }



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
        .attr('fill', d => colorScale(d.sentiment))
        .attr('opacity', '0.4');

    const text = d3.select('.bubbleChartContainer').selectAll('.bubbleText')
      .data(data).enter().append('text')
        .classed('bubbleText', true)
        .text(d => d.word)
        .attr('font-family', 'helvetica')
        .attr('font-size', d => `${d.r * 0.25}px`)
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')

    this.simulation
      .nodes(data).alpha(1).restart()

  }

  regroupBubbles(emotionView) {

    const { width, height, margin, emotionCenters } = this.props;
    if (emotionView) {
      this.simulation
        .force('x', d3.forceX().strength(0.03).x(d => {
          const diff = (emotionCenters[d.emotion].right - emotionCenters[d.emotion].left) / 2;
          return emotionCenters[d.emotion].left + diff;
        }))
        .force('y', d3.forceY().strength(0.03).y(d => (height - margin.top) / 2))
    } else {
      this.simulation
        .force("x", d3.forceX().strength(0.03).x(width / 2))
        .force("y", d3.forceY().strength(0.045).y(height / 2))
    }

    this.simulation.alpha(1).restart()
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
    keywordData: state.trends.keywordData,
    emotionView: state.trends.emotionView,
    emotionCenters: state.trends.emotionCenters
  }
)

const mapDispatchToProps = dispatch => (
  {
    dispatchBubbleData: () => dispatch(setBubbleData())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Bubbles);