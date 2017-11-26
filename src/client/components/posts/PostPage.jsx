import React from 'react';
import { Post } from './Post';

export class PostPage extends React.Component {
  state = {};

  componentDidMount() {
    const postUrl = this.props.match.params.url.toString();
    fetch(`http://localhost:3030/api/pages/${postUrl}`)
      .then(response => response.json())
      .then(response => this.setState({ ...response }))
      .catch(() => this.setState({ error: 404 }));
  }

  render() {
    return this.state.error ? <p>404</p> : <Post full {...this.state} />;
  }
}