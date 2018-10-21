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

  describe('When fill in a username and click Get Posts ', () => {
    describe('And the server returns an error', () => {
      it('Then it shows the error', done => {
        mountApp({
          userResponse: () => Promise.reject({ message: 'error message'})
        })
        .then(addUserNameAndClickGetPosts)
        .then(({app}) =>
          setTimeout(() => {
            app.update();

            const error = app.find('p');

            expect(error.getElements().length)
              .toBeTruthy();

            done();
          })
        );
      });
    });

    it('Then it shows a loading indicator', async () => {
      mountApp()
        .then(addUserNameAndClickGetPosts)
        .then(({app}) => {
          const loadingIndicator = app.find('h3');

          expect(loadingIndicator.getElements().length)
            .toBeTruthy();

          expect(
            loadingIndicator
              .getElements()[0]
              .props.children
          ).toBe('Loading...');
        });
    });

    describe('And we have posts on the server ',
      () => {
        it('Then we get posts written to the screen',
          done => {
            mountApp()
              .then(addUserNameAndClickGetPosts)
              .then(({app}) =>
                setTimeout(() => {
                  app.update();

                  const posts = app.find('li');

                  expect(posts.getElements().length)
                    .toBe(3);

                  done();
                })
              );
          });
      });
  });
});

function mountApp({ userResponse } = {}) {
  http.get = sinon.stub();
  const username = 'Bret';

  http.get
    .withArgs('/posts')
    .returns(Promise.resolve(getDummyPosts()));

  http.get
    .withArgs('/users', {
      params: {
        username
      }
    })
    .returns(userResponse ? userResponse() : Promise.resolve(getDummyUser()));

  const app = mount(<App/>);
  return Promise.resolve({app, http, username});
}

function addUserNameAndClickGetPosts({app, http, username}) {
  const userNameInput = app.find('input');

  expect(app.getElements().length).toBeTruthy();

  userNameInput.simulate('change', { target: { value: username}});

  const button = app.find('button');

  expect(button.getElements().length)
    .toBeTruthy();

  button.simulate('click');

  expect(app.getElements().length).toBeTruthy();

  return Promise.resolve({app, http});
}

function getDummyUser() {
  return [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }
  ];
}

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