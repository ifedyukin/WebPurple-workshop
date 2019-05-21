import React from 'react';
import { MoviesList } from './MovieList';

export class MoviePage extends React.Component {
    state = {
        movies: [],
        error: false
    };

    componentDidMount() {
        fetch(`http://localhost:3030/api/films`)
            .then(response => response.json())
            .then(response => this.setState({ movies: response }))
            .catch(() => this.setState({ error: true }));
    }

    render() {
        console.log(this.state.movies)
        return this.state.error ? <p>404</p> : <MoviesList movies={this.state.movies} />;
    }
  }