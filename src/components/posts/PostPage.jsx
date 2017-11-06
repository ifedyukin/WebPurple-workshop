import React from 'react';
import { Post } from './Post';

export const PostPage = ({ posts, match }) => {
  const post = posts.filter(el => el.id.toString() === match.params.id.toString())[0];
  return post ? <Post {...posts.filter(el => el.id.toString() === match.params.id.toString())[0]} /> : <span>Not found</span>;
}
