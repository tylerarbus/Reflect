import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { SignUpPhonePreferences } from '../../client/src/components/SignUpPhonePreferences.jsx';

describe('SignUpPhonePreferences Component', () => {
  let phonePreferences;

  beforeEach(() => {
    phonePreferences = shallow(<SignUpPhonePreferences />);
  })

  it('should render without crashing', () => {
    expect(phonePreferences.exists()).toBe(true);
  });

  it('should render 3 select fields', () => {
    expect(phonePreferences.find('select').length).toEqual(3);
  });

})