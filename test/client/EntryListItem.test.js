import React from 'react';
import { mount } from 'enzyme';

import Entry from '../../client/src/components/entries/EntryListItem.jsx';

describe('Entry Component', () => {
  let entry;

  beforeEach(() => {
    entry = mount(<Entry date={'Jan 1, 2017'} text={'I had a good day.'} />);
  });

  it('should render without crashing', () => {
    expect(entry.exists()).toBe(true);
  });

  it('Entry renders a div', () => {
    expect(entry.find('div').length).toEqual(2);
  });

  it('Entry renders an audio tag', () => {
    expect(entry.find('audio').length).toEqual(1);
  });

  it('Entry requires date and text props', () => {
    expect(entry.props().date).toBeDefined();
    expect(entry.props().text).toBeDefined();
  });
});

