import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { Nav } from '../../client/src/components/Nav.jsx';

it('should render without crashing', () => {
  const wrapper = shallow(<Nav />);
});