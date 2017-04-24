import React from 'react';
import { shallow } from 'enzyme';

import { SignUpPhoneVerification } from '../../client/src/components/signup/PhoneVerification.jsx';

describe('SignUpPhoneVerification Component', () => {
  let phoneVerification;

  beforeEach(() => {
    phoneVerification = shallow(<SignUpPhoneVerification />);
  });

  it('should render without crashing', () => {
    expect(phoneVerification.exists()).toBe(true);
  });

  it('should render 1 input field', () => {
    expect(phoneVerification.find('input').length).toEqual(1);
  });
});
