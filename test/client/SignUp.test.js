import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { SignUp } from '../../client/src/components/SignUp.jsx';

describe('SignUp Component', () => {
  let signup;

  beforeEach(() => {
    signup = shallow(<SignUp />);
  })

  it('should render without crashing', () => {
    expect(signup.exists()).toBe(true);
  });

  it('should render a button', () => {
    expect(signup.find('.button').exists()).toBe(true);
  });

})