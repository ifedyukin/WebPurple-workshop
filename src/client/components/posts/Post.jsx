import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from '../../helpers';

export const Post = ({ id, title, createdAt, url, body, type, full = false }) => (
  <div className="post">
    {full ? <h2 className="post-title">{title}</h2> : <Link to={`${url}`}><h2 className="post-title">{title}</h2></Link>}
    <span className="post-date">{convertDate(createdAt)}</span>
    <div className="post-text" dangerouslySetInnerHTML={{
      __html: body,
    }} />
  </div>
);
