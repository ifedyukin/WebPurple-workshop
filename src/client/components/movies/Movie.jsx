import React from 'react';

export const Movie = ({ movieName, country, rating, duration }) => (
  <div className="movie">
    <h2>{movieName}</h2>
    <p>{country}</p>
    <span>{rating}</span>
    <span>{duration} мин</span>
  </div>
);
