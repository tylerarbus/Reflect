import React from 'react';
import { mount } from 'enzyme';

import { SignUpAccountPage } from '../../client/src/components/signup/AccountPage.jsx';

describe('SignUpAccountPage Component', () => {
  let acctpage;

  beforeEach(() => {
    acctpage = mount(<SignUpAccountPage signUp={{}}/>);
  });

  it('should render without crashing', () => {
    expect(acctpage.exists()).toBe(true);
  });

  it('should render 5 input fields', () => {
    expect(acctpage.find('input').length).toEqual(5);
  });
});
