import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { PostsList } from './PostsList';
import { PostPage } from './PostPage'

export const Posts = ({ posts, postCount }) => (
  <Switch>
    <Route exact path='/posts' render={(props) => <PostsList posts={posts} postCount={postCount} {...props}/>} />
    <Route path='/posts/:id' render={(props) => <PostPage posts={posts} {...props} />} />
  </Switch>
);
