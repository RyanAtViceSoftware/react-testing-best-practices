import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

const GetPostsForm = ({onUserNameChange, onGetPostsClicked}) => (
  <React.Fragment>
    <input
      type="text"
      placeholder="Username"
      onChange={onUserNameChange}
    />
    <button onClick={onGetPostsClicked}>Get Posts</button>
  </React.Fragment>
);

const Posts = ({posts}) => (
  <ul>
    {posts.map(
      p => <li key={p.id}>{`${p.userId}: ${p.title}`}</li>)
    }
  </ul>
);

const ErrorMessage =({error}) => (
  <div>
    {error && <p style={{color: 'red'}}>{error}</p>}
  </div>
);

const LoadingIndicator = ({fetching}) => (
  <div>
    {fetching && <h3>Loading...</h3>}
  </div>
);

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

    getPostsByUserName(this.state.username)
      .then(posts => this.setState({
        posts: posts,
        fetching: false,
        error: null
      }))
      .catch(error => {
        this.setState({
          error: error.message,
          fetching: false
        });
      });
  }

  render() {
    return (
      <div className="App">
        <GetPostsForm
          onUserNameChange={e => this.setState({
            username: e.target.value
          })}
          onGetPostsClicked={this.getPosts}
        />
        <Posts posts={this.state.posts}/>
        <ErrorMessage error={this.state.error}/>
        <br/>
        <LoadingIndicator fetching={this.state.fetching}/>
      </div>
    );
  }
}

function getPostsByUserName(username) {
  return getUserByUserName(username)
    .then(user => user.length && user[0].id)
    .then(getPostsByUserId);
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
    return Promise.reject(
      new Error('User not found')
    );
  }

  return http.get(
    '/posts', {
      params: {
        userId
      }
    }
  );
}

export const http = {
  get: (url, config, { dummyData } = {}) =>
    dummyData ?
      new Promise(resolve =>
        setTimeout(() => {
            resolve(dummyData);
          }, 1000
        )
      )
      : axios.get(url, config)
          .then(r => r.data)
};

export default App;