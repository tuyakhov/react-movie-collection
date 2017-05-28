import React from 'react';
import Collection from './Collection';
import {shallow} from 'enzyme';

const preloadMovies = [
	{title: 'Test movie', pictures: [{imagePreviewUrl: 'data'}]},
	{title: 'Test movie', pictures: [{imagePreviewUrl: 'data'}]},
];

it('renders movies', () => {
	const component = shallow(<Collection movies={preloadMovies} onDeleteItem={() => {}} />);
	expect(component.find('li')).toHaveLength(preloadMovies.length);
});

it('deletes an item', () => {
	const deleteItem = jest.fn();
	global.confirm = () => true;
	const component = shallow(<Collection movies={preloadMovies} onDeleteItem={deleteItem} />);
	component.find('.movie-collection__actions button').first().simulate('click');
	expect(deleteItem).toBeCalled();
});
