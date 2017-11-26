import React from 'react';
import { Post } from './Post';

export const PostsList = ({ posts }) => (
  posts.map(post => <Post key={post._id} {...post} />)
);
