import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    getPosts()
      .then(posts => this.setState({ posts: posts}));
  }

  render() {
    return (
      <div className="App">
        {!this.state.posts.length && <h3>Loading...</h3>}
        <ul>
          {this.state.posts.map(
            p => <li key={p.id}>{p.title}</li>)
          }
        </ul>
      </div>
    );
  }
}

function getPosts() {
  return http.get('/posts');
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
