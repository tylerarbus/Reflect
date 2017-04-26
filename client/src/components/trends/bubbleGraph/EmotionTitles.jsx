import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upperCase } from './bubbleUtils.js';

export const EmotionTitles = ({ width, height, margin, centers}) => {

  return (
    <g className="emotionTitles">
      {Object.keys(centers).map(emotion => (
        <text
          key={emotion}
          x={centers[emotion].left}// + ((centers[emotion].right - centers[emotion].left) / 2) } 
          y={0}
          fontSize="24"
          textAnchor="right"
          alignmentBaseline="right"
        >
          {upperCase(emotion)}
        </text>
      ))}
    </g>
  )
}

export default EmotionTitles;