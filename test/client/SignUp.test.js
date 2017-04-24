import React from 'react';
import { mount } from 'enzyme';

import { SignUp } from '../../client/src/components/signup/Index.jsx';

describe('SignUp Component', () => {
  let signup;

  beforeEach(() => {
    signup = mount(<SignUp signUp={{}}/>);
  });

  it('should render without crashing', () => {
    expect(signup.exists()).toBe(true);
  });
});
