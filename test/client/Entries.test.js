import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Entries from '../../client/src/components/Entries.jsx';

describe('Entries Component', () => {
  let entries;

  beforeEach(() => {
    entries = shallow(<Entries />);
  })

  it('should render without crashing', () => {
    const wrapper = entries;
  });

  it('Entries renders nested components', () => {
    expect(entries.find('Entry')).toBeDefined();
  })

})

