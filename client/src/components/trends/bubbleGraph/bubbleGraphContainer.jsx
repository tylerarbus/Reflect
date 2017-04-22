import React, { Component } from 'react';
import * as d3 from 'd3';

const dummyKeywords = ['Greed', 'Money', 'Hate the poor', 'Counting money'];

export class BubbleGraphContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: dummyKeywords
    };
  }



  render() {
    const { keywords } = this.state;

    return (
      <div>
        <svg className="bubbleChart">
          <Bubbles />
        </svg>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    width: state.trends.width,
    height: state.trends.height,
    margin: state.trends.margin,
    rawData: state.trends.rawData
  }
)

const mapDispatchToProps = dispatch => (
  {
    dispatchBubbleData: () => dispatch(setBubbleData())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(BubbleGraphContainer);