import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { SignUp } from '../../client/src/components/SignUp.jsx';

describe('SignUp Component', () => {
  let signup;

  beforeEach(() => {
    signup = mount(<SignUp signUp={{}}/>);
  })

  it('should render without crashing', () => {
    expect(signup.exists()).toBe(true);
  });

})