import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import EnzymeToJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import store from '../../../src/client/store';

import Game from '../../../src/client/components/Game/Game';

configure({ adapter: new Adapter() });

describe('# React Tests - Game Components', () => {
  test('snapshot renders - GAME', () => {
    store.getState().player.name = 'name';
    store.getState().game.room = 'room';

    // for scroll into view issuee
    // eslint-disable-next-line func-names
    window.HTMLElement.prototype.scrollIntoView = function () {};

    const wrapper = mount(
      <Provider store={store}>
        <Game />
      </Provider>,
    );

    expect(EnzymeToJson(wrapper)).toMatchSnapshot();
  });
});
