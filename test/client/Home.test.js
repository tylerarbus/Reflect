import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { Home } from '../../client/src/components/Home.jsx';

describe('Home Component', () => {
  let home;

  beforeEach(() => {
    home = shallow(<Home />);
  })

  it('should render without crashing', () => {
    expect(home.exists()).toBe(true);
  });

})