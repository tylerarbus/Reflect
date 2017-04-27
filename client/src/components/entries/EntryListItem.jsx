import React from 'react';
import PropTypes from 'prop-types';
import { toDateString } from './utils.js';

const style = {
  marginTop: '8px'
};

const keywordStyle = {
  marginTop: '8px',
  backgroundColor: '#3F93B8',
  color: 'white'
};

const Entry = ({ entryId, date, text, audio, onDelete, keywords }) => (
  <div className="ui container segment">
    <div className="ui icon buttons right floated">
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
      <source src={`${audio}`} />
    </audio>
    <br />
    <div className="ui horizontal label" style={keywordStyle}>Keywords:</div>
    {keywords.map(keyword =>
      <div className="ui horizontal label" style={style}>
        {keyword}
      </div>
    )}
  </div>
);

Entry.propTypes = {
  entryId: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  keywords: PropTypes.objectOf(PropTypes.array).isRequired
};

export default Entry;
