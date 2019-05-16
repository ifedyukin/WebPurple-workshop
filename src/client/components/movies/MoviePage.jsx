import React from 'react';
import { Movie } from './Movie';

export class MoviePage extends React.Component {
    state = {};
  
    componentDidMount() {
      fetch(`http://localhost:3030/movies`)
        .then(response => response.json())
        .then(response => this.setState({ ...response }))
        .catch(() => this.setState({ error: 404 }));
    }
  
    render() {
      return this.state.error ? <p>404</p> : <Movie {...this.state} />;
    }
  }