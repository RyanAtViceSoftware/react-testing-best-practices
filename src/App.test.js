import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { http } from './App';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe('Given we load our app ', () => {
  it('Then renders without crashing', () => {
    http.get = sinon.stub();

    http.get
      .withArgs('/posts')
      .returns(Promise.resolve(getDummyPosts()));

    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('Then it shows a loading indicator', () => {
    http.get = sinon.stub();

    http.get
      .withArgs('/posts')
      .returns(Promise.resolve(getDummyPosts()));

    const app = mount(<App/>);

    expect(app.getElements().length).toBeTruthy();

    const loadingIndicator = app.find('h3');

    expect(loadingIndicator.getElements().length)
      .toBeTruthy();

    expect(
      loadingIndicator
        .getElements()[0]
        .props.children
    ).toBe('Loading...');
  });

  describe('When we have posts on the server ',
    () => {
    it('Then we get posts written to the screen',
        done => {
      http.get = sinon.stub();

      http.get
        .withArgs('/posts')
        .returns(Promise.resolve(getDummyPosts()));

      const app = mount(<App/>);

      expect(app.getElements().length).toBeTruthy();

      setTimeout(() => {
        app.update();

        const posts = app.find('li');

        expect(posts.getElements().length)
          .toBe(3);

        done();
      });
    });
  });
});

function getDummyPosts() {
  return [
    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
      "userId": 1,
      "id": 3,
      "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }
  ];
}