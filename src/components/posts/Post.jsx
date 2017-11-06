import React from 'react';
import { Link } from 'react-router-dom';

export const Post = ({ id, title, date, text, previewCount }) => (
  <div className="post">
    <Link to={`/posts/${id}`}><h2 className="post-title">{title}</h2></Link>
    <span className="post-date">{date}</span>
    <p className="post-text">{previewCount !== undefined ? text.slice(0, previewCount) : text}</p>
  </div>
);
