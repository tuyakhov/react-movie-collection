import React from 'react';
import {shallow} from 'enzyme';
import View from './View';

it('renders without crashing', () => {
	const fakeMovie = {title: 'Fake movie', pictures: [{imagePreviewUrl: 'data'}]};
	const component = shallow(<View movie={fakeMovie}/>);
	expect(component.find('h2').text()).toEqual(fakeMovie.title);
});
