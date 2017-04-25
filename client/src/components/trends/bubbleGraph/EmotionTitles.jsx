import React, { Component } from 'react';
import { connect } from 'react-redux';

export const EmotionTitles = ({ width, height, margin, centers, emotions }) => {
  return (
    <g className="emotionTitles">
      {console.log('emotions', emotions)}
      {emotions.map(emotion => (
        <text
          key={emotion}
          x={centers(height, width - margin.right, emotion, 'x')}
          y={0}
          fontSize="24"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {emotion}
        </text>
      ))}
    </g>
  )
}

export default EmotionTitles;