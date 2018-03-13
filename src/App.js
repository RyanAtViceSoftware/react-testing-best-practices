import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      fetching: false
    };

    this.getPosts = this.getPosts.bind(this);
  }

  getPosts(e) {
    e.preventDefault();

    this.setState({ fetching: true });

    getUserByUserName(this.input.value)
      .then(user => user.length && user[0].id)
      .then(getPostsByUserId)
      .then(posts => this.setState({
        posts: posts,
        fetching: false,
        error: null
      }))
      .catch(error => {
        this.setState({error, fetching: false});
      });
  }

  render() {
    return (
      <div className="App">
        <input
          type="text"
          placeholder="Username"
          ref={(input) => this.input = input}
        />
        <button onClick={this.getPosts}>Get Posts</button>
        <br/>
        {this.state.error && <p style={{color: 'red'}}>{this.state.error}</p>}
        {this.state.fetching && <h3>Loading...</h3>}
        <ul>
          {this.state.posts.map(
            p => <li key={p.id}>{`${p.userId}: ${p.title}`}</li>)
          }
        </ul>
      </div>
    );
  }
}

function getUserByUserName(username) {
  return http.get(
    '/users',
    {
      params: {
        username
      }
    });
}

function getPostsByUserId(userId) {
  if (!userId) {
    return Promise.reject('User not found');
  }

  return http.get(
    '/posts', {
      params: {
        userId
      }
    }
  );
}

const baseUrl = `http://jsonplaceholder.typicode.com`;

export const http = {
  get: (url, config, { dummyData } = {}) =>
    dummyData ?
      new Promise(resolve =>
        setTimeout(() => {
            resolve(dummyData);
          }, 1000
        )
      )
      : axios.get(baseUrl + url, config).then(r => r.data)
};

export default App;
