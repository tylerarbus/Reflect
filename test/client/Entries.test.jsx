import React from 'react';
import { shallow } from 'enzyme';

import { JournalView } from '../../client/src/components/entries/JournalView.jsx';

const setup = () => {
  const props = {
    dispatchGetEntries: jest.fn(),
    dispatchSetDisplayMonth: jest.fn()
  };

  const journalView = shallow(<JournalView {...props} />);

  return {
    props,
    journalView
  };
};

describe('JournalView Component', () => {
  it('should render without crashing', () => {
    const { journalView } = setup();
    expect(journalView.exists()).toBe(true);
  });

  it('JournalView renders nested components', () => {
    const { journalView } = setup();
    expect(journalView.find('Entries').length).toEqual(1);
  });
});
