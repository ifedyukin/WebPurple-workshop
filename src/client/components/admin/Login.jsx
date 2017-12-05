import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '',
      password: '',
      error: false,
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { login, password } = this.state;
    fetch('http://localhost:3030/api/signin', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      body: `login=${login}&password=${password}`,
    })
      .then(response => response.json())
      .then(response => {
        if (typeof response === 'string') {
          cookies.set('token', response, { path: '/' });
          this.props.onLogin();
        }
      })
      .catch(() => this.setState({ error: true }))
  }

  onChange = (field, e) => {
    this.setState({ [field]: e.target.value });
  }

  render() {
    const { login, password, error } = this.state;
    return (
      <div className="login-container">
        <form onSubmit={this.onSubmit} className="login-form">
          {error ? <span className="login-error">Incorrect login/password!</span> : null}
          <input type="text" placeholder="Login" value={login} onChange={this.onChange.bind(null, 'login')} />
          <input type="password" placeholder="Password" value={password} onChange={this.onChange.bind(null, 'password')} />
          <input type="submit" value="Log In" />
        </form>
      </div>
    )
  }
}
