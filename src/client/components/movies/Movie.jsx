import React from 'react';

export const Movie = ({  title, country, rating, duration }) => (
  <div className="movie">
    <h2>{title}</h2>
    <p>{country}</p>
    <span>{rating}</span>
    <span>{duration} мин</span>
  </div>
);
