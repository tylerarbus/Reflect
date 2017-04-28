import React from 'react';
import { shallow } from 'enzyme';

import { Sidebar } from '../../client/src/components/entries/Sidebar.jsx';

const exampleMonthData = { 2016: { '02': ['entryID', 'entryID'], '03': ['entryID'] } };

const setup = () => {
  const props = {
    byDate: exampleMonthData,
    onMonthClick: jest.fn()
  };

  const timeline = shallow(<Sidebar {...props} />);

  return {
    props,
    timeline
  };
};

describe('Timeline Component', () => {
  it('should render without crashing', () => {
    const { timeline } = setup();
    expect(timeline.exists()).toBe(true);
  });

  it('should render a menu', () => {
    const { timeline } = setup();
    expect(timeline.find('.menu').length).toEqual(1);
  });

  it('should render each month from given props', () => {
    const { timeline } = setup();
    const months = timeline.find('.timelineMonth');

    expect(months.first().text()).toContain('1');
  });

  it('should render the number of entries in each given month', () => {
    const { timeline } = setup();
    const months = timeline.find('.timelineMonth');

    expect(months.first().text()).toContain('1');
  });
});

