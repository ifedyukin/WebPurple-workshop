import React from 'react';
import { PostsList } from './posts/PostsList';

export const MainPage = ({ img, posts, postCount = 0, previewCount }) => (
  <div className="main">
    <img src={img} />
    <PostsList posts={postCount === 0 ? posts : posts.slice(0, postCount)} previewCount={previewCount} />
  </div>
);