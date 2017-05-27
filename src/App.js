import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Collection from './movie/Collection';
import Form from './movie/Form';
import {Route, Link} from 'react-router-dom';

class App extends Component {

	static propTypes = {
		storage: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			movies: []
		};
	}

	componentDidMount() {
		this.setState({movies: this.getMovies()})
	}

	componentDidUpdate() {
		this.persistState();
	}

	getMovies() {
		return JSON.parse(this.props.storage.getItem('movies')) || [];
	}

	persistState() {
		this.props.storage.setItem('movies', JSON.stringify(this.state.movies));
	}

	/**
	 * Appends movie to the storage.
	 * @param data
	 */
	createMovie(data) {
		this.setState({movies: [...this.state.movies, data]});
	}

	/**
	 * Update movie in storage.
	 * @param key
	 * @param data
	 */
	updateMovie(key, data) {
		const {movies} = this.state;
		this.setState({movies: [
			...movies.slice(0, key),
			data,
			...movies.slice(key + 1)
		]});
	}

	/**
	 * Remove a movie from storage
	 * @param key
	 */
	deleteMovie(key) {
		const {movies} = this.state;
		this.setState({movies: [
			...movies.slice(0, key),
			...movies.slice(key + 1)
		]});
	}

	render() {
		return (
			<div className="app">
				<div className="app-header">
					<h2>Welcome to Movie Collection</h2>
				</div>

				<Link to={'/movies'}>My Collection</Link>
				<Link to={'/movies/create'}>Add a movie</Link>

				<Route
					exact
					path="/movies"
					render={() => <Collection
						movies={this.state.movies}
						onDeleteItem={(id) => this.deleteMovie(id)}
					/>}
				/>
				<Route
					path="/movies/create"
					render={() => <Form onSubmit={(data) => this.createMovie(data)} />}
				/>
				<Route
					path="/movies/update/:id"
					render={({match}) => {
						const id = match.params.id;
						const movie = this.state.movies[id];
						if (!movie) throw Error('Movie doesn\'t exist');
						return <Form onSubmit={(data) => this.updateMovie(id, data)} {...movie}/>
					}}
				/>
			</div>
		);
	}
}

export default App;
