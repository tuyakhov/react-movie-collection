import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './View.css';

class View extends Component {

	static propTypes = {
		movie: PropTypes.object.isRequired
	};

	render() {
		const {title, pictures} = this.props.movie;
		return (
			<div className="movie-view">
				<h2>{title}</h2>
				{pictures.map((picture, index) => {
					return <img key={index} src={picture.imagePreviewUrl} alt=""/>
				})}
			</div>
		)
	}
}

export default View;