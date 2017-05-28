import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {MemoryRouter} from 'react-router-dom'
import {shallow, mount} from 'enzyme';

const fakeStorage = {
	store: {},
	getItem(key) {
		return this.store[key]
	},
	setItem(key, value) {
		this.store[key] = value;
	}
};

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<MemoryRouter>
			<App storage={fakeStorage}/>
		</MemoryRouter>
		, div
	);
});

it('creates, updates and deletes movies', () => {
	// mock react router context
	const context = {router: {history: {push(){}, replace(){}}}};
	const app = shallow(<App storage={fakeStorage}/>, {context});
	let fakeMovie = {title: 'Fake movie', pictures: [{imagePreviewUrl: 'data'}]};
	// create
	app.instance().createMovie(fakeMovie);
	expect(fakeStorage.getItem('movies')).toEqual(JSON.stringify([fakeMovie]));
	// update
	fakeMovie.title = 'Fake movie 2';
	app.instance().updateMovie(0, fakeMovie);
	expect(fakeStorage.getItem('movies')).toEqual(JSON.stringify([fakeMovie]));
	// delete
	app.instance().deleteMovie(0);
	expect(fakeStorage.getItem('movies')).toEqual(JSON.stringify([]));
});

it('renders update page', () => {
	let fakeMovie = {title: 'Fake movie', pictures: [{imagePreviewUrl: 'data'}]};
	fakeStorage.setItem('movies', JSON.stringify([fakeMovie]));
	const app = mount(
		<MemoryRouter initialEntries={['/movies/update/0']}>
			<App storage={fakeStorage}/>
		</MemoryRouter>
	);
	expect(app.find('form').length).toEqual(1);
});

it('renders create page', () => {
	const app = mount(
		<MemoryRouter initialEntries={['/movies/create']}>
			<App storage={fakeStorage}/>
		</MemoryRouter>
	);
	expect(app.find('form').length).toEqual(1);
});

it('renders movie collection', () => {
	let fakeMovie = {title: 'Fake movie', pictures: [{imagePreviewUrl: 'data'}]};
	fakeStorage.setItem('movies', JSON.stringify([fakeMovie, fakeMovie]));
	const app = mount(
		<MemoryRouter initialEntries={['/movies']}>
			<App storage={fakeStorage}/>
		</MemoryRouter>
	);
	expect(app.find('.movie-collection li').length).toEqual(2);
});
