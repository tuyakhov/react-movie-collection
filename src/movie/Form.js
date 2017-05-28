import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Form.css';

class Form extends Component {

	static propTypes = {
		onSubmit: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title || '',
			pictures: this.props.pictures || [],
			errors: []
		};
	}

	/**
	 * Validate attributes
	 * @returns {boolean}
	 */
	validate() {
		const {title, pictures} = this.state;
		let errors = [];
		if (!title || title.length < 3) {
			errors.push("Title can't be blank or have less then 3 characters.");
		}
		if (!pictures || !pictures.length) {
			errors.push("You have to upload at least one picture.");
		}
		this.setState({errors});
		return !errors.length;
	}

	handleInputChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.validate()) {
			this.props.onSubmit(this.state);
		}
	}

	addPicture(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState((prevState) => {
				return {
					...prevState,
					pictures: [...prevState.pictures, {
						file: file,
						imagePreviewUrl: reader.result
					}]
				}
			})
		};

		reader.readAsDataURL(file);
	}

	removePicture(key) {
		this.setState({...this.state, pictures: [
			...this.state.pictures.slice(0, key),
			...this.state.pictures.slice(key + 1)
		]})
	}

	render() {
		return (
			<form onSubmit={e => this.handleSubmit(e)}>
				{!!this.state.errors.length &&
					<ul className="errors">
						{this.state.errors.map((error, key) => {
							return <li key={key}>{error}</li>
						})}
					</ul>
				}
				<div>
					<h4>Title:</h4>
					<input
						name="title"
						type="text"
						value={this.state.title}
						onChange={e => this.handleInputChange(e)} />
				</div>
				<div>
					<h4>Pictures:</h4>
					<label className="file-input">
						+ Upload picture
						<input
							accept="image/*"
							name="pictures"
							type="file"
							onChange={e => this.addPicture(e)} />
					</label>
				</div>
				<div className="form-gallery">
					{this.state.pictures.map((picture, index) => {
						return <div key={index} className="form-gallery__item">
							<img src={picture.imagePreviewUrl} alt=""/>
							<button onClick={() => this.removePicture(index)}>&#128465;</button>
						</div>
					})}
					{this.state.pictures.length === 0 &&
						<p>No pictures yet.</p>
					}
				</div>
				<button type="submit">Submit</button>
			</form>
		)
	}
}

export default Form;
