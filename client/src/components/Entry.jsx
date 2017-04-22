import React from 'react';
import PropTypes from 'prop-types';
import { toDateString } from '../utils.js';

const Entry = ({ entryId, date, text, audio, onDelete }) => (
  <div className="ui piled container segment">
    <div className="ui icon buttons right floated">
      <button className="ui button">
        <i className="edit icon" />
      </button>
      <button
        className="ui button"
        onClick={() => { onDelete(entryId); }}
      >
        <i className="trash icon" />
      </button>
    </div>
    <h4 className="date ui header">{toDateString(date)}</h4>
    <p>{text}</p>
    <audio controls style={{ width: '100%' }}>
      <source src={`/audio/${audio}`} />
    </audio>
  </div>
);

Entry.propTypes = {
  entryId: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Entry;

