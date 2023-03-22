import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import EnzymeToJson from 'enzyme-to-json';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from '../../../src/client/store';
import Header from '../../../src/client/components/Header/Header';
import Footer from '../../../src/client/components/Footer/Footer';
import Login from '../../../src/client/components/Login/Login';

configure({ adapter: new Adapter() });

describe('# React Tests - App Components', () => {
  test('snapshot render - HEADER', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Header />
        </ConnectedRouter>
      </Provider>,
    );

    expect(EnzymeToJson(wrapper)).toMatchSnapshot();
  });

  test('snapshot renders - FOOTER', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Footer />
        </ConnectedRouter>
      </Provider>,
    );

    expect(EnzymeToJson(wrapper)).toMatchSnapshot();
  });

  test('snapshot renders - LOGIN', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Login />
        </ConnectedRouter>
      </Provider>,
    );

    expect(EnzymeToJson(wrapper)).toMatchSnapshot();
  });
});
