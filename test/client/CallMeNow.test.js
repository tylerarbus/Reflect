import React from 'react';
import { shallow, mount, render } from 'enzyme';

import CallMeNow from '../../client/src/components/CallMeNow.jsx';

describe('Nav Component', () => {

  let callNow;

  beforeEach(() => {
    callNow = shallow(<CallMeNow />);
  });

  it('should render without crashing', () => {
  });

  it('should render a button with id "call-now"', () => {
    expect(callNow.find('#call-now').length).toEqual(1);
  });

});
