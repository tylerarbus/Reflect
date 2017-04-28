import React from 'react';
import PropTypes from 'prop-types';
import { toDateString, getFaceIcon } from './utils.js';

const style = {
  marginTop: '8px'
};

const keywordStyle = {
  marginTop: '8px',
  backgroundColor: '#3F93B8',
  color: 'white'
};

const faceStyle = {
  float: 'right'
};

const test = {
  position: 'relative'
};

const please = {
  position: 'absolute',
  right: '5%',
  bottom: '5%'
 // width: '30px'
};

const Entry = ({ entryId, date, text, audio, onDelete, analysis }) => (
  <div className="ui container segment" style={test}>
    <div className="ui icon right floated">
      <i className={`large ${getFaceIcon(analysis.sentiment)} icon`} style={faceStyle} />
    </div>
    <h4 className="date ui header">{toDateString(date)}</h4>
    <p>{text}</p>
    <audio controls style={{ width: '100%' }}>
      <source src={`${audio}`} />
    </audio>
    <div className="ui horizontal label" style={keywordStyle}>Keywords:</div>
    {analysis.keywords.map(keyword =>
      <div className="ui horizontal label" style={style}>
        {keyword}
      </div>
    )}
    <div className="ui buttons right" style={please}>
     <button
       className="ui button"
       onClick={() => { onDelete(entryId); }}
     //  style={please}
      >
       <i className="trash icon" />
     </button>
     </div>
  </div>
);

Entry.propTypes = {
  entryId: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  analysis: PropTypes.objectOf(PropTypes.object).isRequired
};

export default Entry;
