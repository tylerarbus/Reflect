import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { SignUpPhoneVerification } from '../../client/src/components/SignUpPhoneVerification.jsx';

describe('SignUpPhoneVerification Component', () => {
  let phoneVerification;

  beforeEach(() => {
    phoneVerification = shallow(<SignUpPhoneVerification />);
  })

  it('should render without crashing', () => {
    expect(phoneVerification.exists()).toBe(true);
  });

  it('should render 1 input field', () => {
    expect(phoneVerification.find('input').length).toEqual(1);
  });

})