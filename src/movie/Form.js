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
			pictures: this.props.pictures || []
		};
	}

	handleInputChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onSubmit(this.state);
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

	render() {
		return (
			<form onSubmit={e => this.handleSubmit(e)}>
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
						+ Add picture
						<input
							name="pictures"
							type="file"
							onChange={e => this.addPicture(e)} />
					</label>
				</div>
				<div className="form-gallery">
					{this.state.pictures.map((picture, index) => {
						return <img key={index} src={picture.imagePreviewUrl} alt=""/>
					})}
				</div>
				<input type="submit" value="Submit" />
			</form>
		)
	}
}

export default Form;
