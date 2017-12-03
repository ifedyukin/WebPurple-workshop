import React from 'react';
import { Post } from '../posts/Post';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

const cookie = new Cookies();

export class Panel extends React.Component {
  state = { posts: [] }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts() {
    fetch('http://localhost:3030/api/posts')
      .then(response => response.json())
      .then(response => this.setState({ posts: response.posts }));
  }

  onDelete(_id) {
    fetch(`http://localhost:3030/api/posts/${_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': cookie.get('token'),
      },
    })
      .then(() => {
        this.loadPosts();
      })
      .catch(e => console.error(e));
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="panel-container">
        <Link to="/edit" className="panel-container__newPost">New post</Link>
        {posts.map(post => <div key={post._id} className="panel-container__post">
          <Post {...post} />
          <div className="panel-container__buttons">
            <Link to={`/edit/${post.url}`}>Edit</Link>
            <a onClick={() => this.onDelete(post._id)}>Delete</a>
          </div>
        </div>)}
      </div>
    )
  }
}
