import React from 'react';
import { shallow } from 'enzyme';

import { EntriesIndex } from '../../client/src/components/entries/Index.jsx';

const setup = () => {
  const props = {
    dispatchGetEntries: jest.fn(),
    dispatchSetDisplayMonth: jest.fn(),
    entries: [{}]
  };

  const entriesIndex = shallow(<EntriesIndex {...props} />);

  return {
    props,
    entriesIndex
  };
};

describe('entriesIndex Component', () => {
  it('should render without crashing', () => {
    const { entriesIndex } = setup();
    expect(entriesIndex.exists()).toBe(true);
  });

  it('entriesIndex renders nested components', () => {
    const { entriesIndex } = setup();
    expect(entriesIndex.find('Entries').length).toEqual(1);
  });
});
