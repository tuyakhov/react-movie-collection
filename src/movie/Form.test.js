import React from 'react';
import Form from './Form';
import {shallow} from 'enzyme';

const dummyMovie = {title: 'Test movie', pictures: [{imagePreviewUrl: 'data'}]};

it('renders form with predefined attributes', () => {
	const component = shallow(<Form {...dummyMovie} onSubmit={() => {}}/>);
	expect(component.find('input[name="title"]').props().value).toEqual('Test movie');
	expect(component.find('.form-gallery img').length).toEqual(1);
});

it('prevents submission if not valid', () => {
	const submitForm = jest.fn();
	const component = shallow(<Form onSubmit={submitForm} />);
	const mockEvent = {preventDefault: () => {}};
	component.simulate('submit', mockEvent);
	expect(submitForm).not.toBeCalled();

	component.setState({...dummyMovie});
	component.simulate('submit', mockEvent);
	expect(submitForm).toBeCalled();
});

it('uploads and removes image', () => {
	const mockEvent = {preventDefault: () => {}, target: {files: ['data:image/gif;base64']}};
	// mock file reader
	global.FileReader = jest.fn(() => {
		return {readAsDataURL: function() {this.onloadend()}}
	});
	const component = shallow(<Form onSubmit={() => {}} />);
	component.find('input[type="file"]').simulate('change', mockEvent);
	const state = component.state();
	expect(state.pictures).toBeDefined();
	expect(state.pictures.length).toEqual(1);
	// remove image
	component.find('.form-gallery__item button').simulate('click');
	expect(component.state().pictures.length).toEqual(0);
});

