import React from 'react';
import { shallow } from 'enzyme';

import { CallMeNow } from '../../client/src/components/entries/CallMeNow.jsx';

describe('CallMeNow Component', () => {

  let callNow;

  beforeEach(() => {
    callNow = shallow(<CallMeNow />);
  });

  it('should render without crashing', () => {
    expect(callNow.exists()).toBe(true);
  });

  it('should render a button with id "call-now"', () => {
    expect(callNow.find('#call-now').length).toEqual(1);
  });

});
