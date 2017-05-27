import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Collection.css';
import {Link} from 'react-router-dom';

class Collection extends Component {

	static propTypes = {
		movies: PropTypes.array.isRequired,
		onDeleteItem: PropTypes.func.isRequired,
	};

	deleteItem(key) {
		if (window.confirm('Are you sure?')) {
			this.props.onDeleteItem(key);
		}
	}

	render() {
		return (
			<ul>
				{this.props.movies.map((movie, index) => {
					return <li key={index}>
						<h3>{movie.title}</h3>
						<img src={movie.pictures[0].imagePreviewUrl} alt={movie.title}/>
						<span onClick={() => this.deleteItem(index)}>delete</span>
						<Link to={`/movies/update/${index}`}>update</Link>
					</li>
				})}
			</ul>
		)
	}
}

export default Collection;
