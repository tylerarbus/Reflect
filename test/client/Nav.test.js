import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { Nav } from '../../client/src/components/Nav.jsx';

describe('Nav Component', () => {

  let navbar;

  beforeEach(() => {
    navbar = shallow(<Nav />);
  });

  it('should render without crashing', () => {
  });

  it('should render a div with id "navbar"', () => {
    expect(navbar.find('#navbar').length).toEqual(1);
  });

});



