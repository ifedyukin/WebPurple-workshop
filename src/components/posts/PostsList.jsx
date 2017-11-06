import React from 'react';
import { Post } from './Post';

export const PostsList = ({ posts, previewCount }) => (
  posts.map(post => <Post key={post.id} {...post} previewCount={previewCount} />)
);
