import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Header } from './Header';
import { Posts } from './posts/';
import { Admin } from './Admin';
import { MainPage } from './MainPage';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'React blog',
      subtitle: 'My personal blog',
      img: '/image.jpg',
      about: {
        img: '',
        text: 'Hello, my name is Igor!',
      },
      links: [
        { label: 'All posts', url: '/posts' },
        { label: 'WebPurple', url: 'http://www.webpurple.net' },
      ],
      posts: [
        { id: 1, title: 'Test Post1', date: '01.01.01', text: "Hello World!" },
        { id: 2, title: 'Test Post2', date: '01.01.01', text: "Hello World!" },
        { id: 3, title: 'Test Post3', date: '01.01.01', text: "Hello World!" },
        { id: 4, title: 'Test Post4', date: '01.01.01', text: "Hello World!" },
        { id: 5, title: 'Test Post5', date: '01.01.01', text: "Hello World!" },
        { id: 6, title: 'Test Post6', date: '01.01.01', text: "Hello World!" },
      ],
      postCount: 5,
      previewCount: 140,
    }
  }

  render() {
    const { title, subtitle, links, img, postCount, posts, previewCount } = this.state;
    const MainPageBinded = () => (
      <MainPage posts={posts} previewCount={previewCount} postCount={postCount} img={img} />
    );
    return (
      <section>
        <Header title={title} subtitle={subtitle} links={links} />
        <Switch>
          <Route exact path='/' render={MainPageBinded} />
          <Route path='/posts' render={(props) => (<Posts postCount={postCount} posts={posts} {...props} />)} />
          <Route exact path='/admin' component={Admin} />
          <Route path='*' render={MainPageBinded} />
        </Switch>
      </section>
    );
  }
}
