import React from 'react';
import PropTypes from 'prop-types';
import { toDateString } from '../utils.js';

const Entry = ({ date, text, audio }) => (
  <div className="ui piled container segment">
    <h4 className="date ui header">{toDateString(date)}</h4>
    <p>{text}</p>
    <audio controls style={{ width: '100%' }}>
      <source src={`/audio/${audio}`} />
    </audio>
  </div>
);

Entry.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired
};

export default Entry;

