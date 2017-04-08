import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { App } from '../../client/src/components/App.jsx';

it('should render without crashing', () => {
  const wrapper = shallow(<App />);
});

