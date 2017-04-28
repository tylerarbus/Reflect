import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EntryListItem from './EntryListItem.jsx';
import { SearchResults } from './Placeholders.jsx';

export default class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { entries, onDelete, analysis, numSearchResults } = this.props;
        
    return (
      <div
        className="ten wide column"
        style={{ marginTop: '14px' }}
      >
        {numSearchResults &&
          <SearchResults results={numSearchResults} />
        }
        {entries.filter(entry => analysis[entry.entry_id]).map(entry =>
          <EntryListItem
            date={entry.created}
            text={entry.text}
            key={entry.entry_id}
            audio={entry.local_path}
            onDelete={onDelete}
            entryId={entry.entry_id}
            analysis={analysis[entry.entry_id]}
          />
        )}
      </div>
    );
  }
}


Entries.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  numSearchResults: PropTypes.number,
  analysis: PropTypes.objectOf(PropTypes.object)
};

Entries.defaultProps = {
  entries: [],
  numSearchResults: null,
  analysis: {}
};

