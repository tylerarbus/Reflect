import React from 'react';
import { shallow } from 'enzyme';

import { Home } from '../../client/src/components/landing/Index.jsx';

describe('Home Component', () => {
  let home;

  beforeEach(() => {
    home = shallow(<Home />);
  });

  it('should render without crashing', () => {
    expect(home.exists()).toBe(true);
  });
});
