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

    expect(app.getElements().length).toBeTruthy();

    const loadingIndicator = app.find('h3');

    expect(loadingIndicator.getElements().length).toBeTruthy();

    expect(loadingIndicator.getElements()[0].props.children).toBe('Loading...');
  });
});
