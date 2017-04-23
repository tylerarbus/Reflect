import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Entry from './Entry.jsx';

export default class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { entries, onDelete } = this.props;
    return (
      <div className="eight wide column">
        {entries.map(entry =>
          <Entry
            date={entry.created}
            text={entry.text}
            key={entry.entry_id}
            audio={entry.local_path}
            onDelete={onDelete}
            entryId={entry.entry_id}
          />
        )}
      </div>
    );
  }
}


Entries.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired
};

Entries.defaultProps = {
  entries: []
};

