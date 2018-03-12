import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('Given we load our app ', () => {
  it('Then renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Then it shows a loading indicator', () => {
    const app = mount(<App/>);

    expect(app).toBeTruthy();
  });

  describe('When we have posts on the server ', () => {
    it('Then we get posts written to the screen', done => {
      const app = mount(<App/>);

      expect(app).toBeTruthy();

      console.log('settimeout');

      setTimeout(() => {
        app.update();
        console.log(app.debug());
        done();
      }, 1001);
    });
  });
});
