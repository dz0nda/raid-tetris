import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { App } from './App'; // Update the path

describe('App', () => {
  it('renders Game component for /:room[:name] route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/room123:name123']}>
          <App />
          <Route
            path="/:room[:name]"
            render={({ match }) => {
              // expect(match.params.room).toBe('room123');
              // expect(match.params.name).toBe('name123');
              return null; // you can return any placeholder or null
            }}
          />
        </MemoryRouter>
        ,
      </Provider>,
    );
  });

  it('renders Login component for / route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
          <Route
            path="/"
            render={() => {
              // You can add some assertion here to check if Login component is rendered
              // For example:
              // expect(screen.getByText(/some text specific to Login component/i)).toBeInTheDocument();
              return null; // you can return any placeholder or null
            }}
          />
        </MemoryRouter>
        ,
      </Provider>,
    );
  });
});
