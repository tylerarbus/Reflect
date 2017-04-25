import React, { Component } from 'react';
import { connect } from 'react-redux';

export const EmotionTitles = ({ width, height, margin, centers}) => {
  // return (
  //   <div>EmotionTitles</div>
  // )



  return (
    <g className="emotionTitles">
    {console.log('centers', centers)}
      {Object.keys(centers).map(emotion => (
        <text
          key={emotion}
          x={centers[emotion].left + ((centers[emotion].right - centers[emotion].left) / 2) } 
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