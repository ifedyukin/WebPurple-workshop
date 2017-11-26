import React from 'react';
import { PostsList } from './posts/PostsList';

export const MainPage = ({ img, posts }) => (
  <div className="main">
    <img src={img} alt="logo" />
    <PostsList posts={posts} />
  </div>
);