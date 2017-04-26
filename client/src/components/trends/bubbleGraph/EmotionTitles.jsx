import React from 'react';
import PropTypes from 'prop-types';
import { upperCase } from './bubbleUtils.js';

export const EmotionTitles = ({ centers }) => (
  <g className="emotionTitles">
    {Object.keys(centers).map(emotion => (
      <text
        key={emotion}
        x={centers[emotion].left}
        y={0}
        fontSize="24"
        textAnchor="right"
        alignmentBaseline="right"
      >
        {upperCase(emotion)}
      </text>
    ))}
  </g>
);

EmotionTitles.propTypes = {
  centers: PropTypes.objectOf(PropTypes.object).isRequired
};

export default EmotionTitles;
