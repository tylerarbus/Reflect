import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Entries from '../../client/src/components/Entries.jsx';

it('should render without crashing', () => {
  const wrapper = shallow(<Entries />);
});