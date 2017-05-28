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
			<ul className="movie-collection">
				{this.props.movies.map((movie, index) => {
					return <li key={index}>
						<Link to={`/movies/view/${index}`}><h3>{movie.title}</h3></Link>
						<img src={movie.pictures[0].imagePreviewUrl} alt={movie.title}/>
						<div className="movie-collection__actions">
							<button onClick={() => this.deleteItem(index)}>&#128465;</button>
							<Link to={`/movies/update/${index}`}>&#9998;</Link>
						</div>
					</li>
				})}
			</ul>
		)
	}
}

export default Collection;
