import React from 'react';
import { mount } from 'enzyme';

import { Nav } from '../../client/src/components/nav/Index.jsx';

describe('Nav Component', () => {
  let navbar;

  beforeEach(() => {
    navbar = mount(<Nav user={{id:10}}/>);
  });

  it('should render without crashing', () => {
  });

  it('should render a div with id "navbar"', () => {
    expect(navbar.find('#navbar').length).toEqual(1);
  });
});
