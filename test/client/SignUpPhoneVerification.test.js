import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { SignUpPhoneVerification } from '../../client/src/components/SignUpPhoneVerification.jsx';

describe('SignUpPhoneVerification Component', () => {
  let phoneVerfification;

  beforeEach(() => {
    phoneVerfification = shallow(<SignUpPhoneVerification />);
  })

  it('should render without crashing', () => {
    expect(phoneVerfification.exists()).toBe(true);
  });

  it('should render 1 input field', () => {
    expect(phoneVerfification.find('input').length).toEqual(1);
  });

})