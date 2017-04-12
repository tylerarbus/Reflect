import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { SignUpAccountPage } from '../../client/src/components/SignUpAccountPage.jsx';

describe('SignUpAccountPage Component', () => {
  let acctpage;

  beforeEach(() => {
    acctpage = shallow(<SignUpAccountPage />);
  })

  it('should render without crashing', () => {
    expect(acctpage.exists()).toBe(true);
  });

  it('should render 5 input fields', () => {
    expect(acctpage.find('input').length).toEqual(5);
  });

})