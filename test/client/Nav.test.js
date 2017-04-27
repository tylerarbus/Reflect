import React from 'react';
import { shallow } from 'enzyme';

import { Nav } from '../../client/src/components/nav/Index.jsx';


describe('Nav Component', () => {
  let navbar;

  beforeEach(() => {
    navbar = shallow(<Nav user={{id:10}} router={{location:'/entries'}} signup={{}} />);
  });

  it('should render without crashing', () => {
  });

  it('should render a div with id "navbar"', () => {
    expect(navbar.find('#navbar').length).toEqual(1);
  });
});
