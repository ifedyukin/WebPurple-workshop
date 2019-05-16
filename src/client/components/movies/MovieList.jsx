import React from 'react';
import { Movie } from './Movie';

export const MoviesList = ({ movies }) => (
    movies.map(movie => <Movie key={movie._id} {...movie} />)
);