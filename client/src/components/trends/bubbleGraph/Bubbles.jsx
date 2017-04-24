import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

export class Bubbles extends Component {
  constructor(props) {
    super(props);
    this.state = { g: null };

   // this.renderBubbles = this.renderBubbles.bind(this);
  }

  componentDidMount() {
    const { width, height, margin, keywordData } = this.props;
    const forceStrength = 0.03
   // this.renderBubbles(dummyKeywords);
    const bubbles = d3.select('.bubbles').selectAll('circle')   
      .data(keywordData)

    const bubblesE = bubbles
      .enter()
      .append('circle')
        .attr('r', d => d.r)//d.r)
        // .attr('cx', d => d.x + 50 - margin.right)
        // .attr('cy', d => d.y + 50 - margin.top)
        .attr('fill', '#89EEB2');

    const text = d3.select('.bubbles').selectAll('text')
      .data(keywordData)
      .enter()
      .append('text')
        // .attr('x', d => d.x + 50 - margin.right)
        // .attr('y', d => d.y + 50 - margin.top)
        .text(d => d.word)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '10px')
        .attr('text-anchor', 'middle')
        .attr('fill', 'black');

    const simulation = d3.forceSimulation()
     .force("x", d3.forceX().strength(forceStrength).x(width / 2))
     .force("y", d3.forceY().strength(forceStrength).y(height / 2))
     .on('tick', ticked)
     .force('charge', d3.forceManyBody().strength(-25));
     //.nodes(keywordData)
     //.force("collide", d3.forceCollide(30));

    function ticked (e) {
      console.log('tick')
      bubblesE
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);

      text
          .attr('x', d => d.x)
          .attr('y', d => d.y);
    }

    function charge(d) {
  return -forceStrength * Math.pow(d.r, 2.0);
}
  
  simulation
    .nodes(keywordData)

  }


  render() {
    return (
      <g className="bubbles" />
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