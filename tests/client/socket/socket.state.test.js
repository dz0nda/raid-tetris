import td from 'testdouble';

import ev from '../../../src/shared/events';

import store from '../../../src/client/store';

import { mockMiddleware, id } from '../helpers/socketHelper';

describe('# Socket Tests - State Events', () => {
  it('dispatches the SOCKET_CONNECTED action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.SOCKET_CONNECTED,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the SOCKET_CONNECTION_ERROR action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.SOCKET_CONNECTION_ERROR,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the SOCKET_CONNECTION_TIMEOUT action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.SOCKET_CONNECTION_TIMEOUT,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the SOCKET_DISCONNECTED action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.SOCKET_DISCONNECTED,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the SOCKET_RECONNECTED action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.SOCKET_RECONNECTED,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });
  it('dispatches the SOCKET_CONNECTION_TIMEOUT action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.SOCKET_CONNECTION_TIMEOUT,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the SOCKET_RECONNECTION_ATTEMPT action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.SOCKET_RECONNECTION_ATTEMPT,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the SOCKET_RECONNECTION_ERROR action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.SOCKET_RECONNECTION_ERROR,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the SOCKET_RECONNECTION_FAILED action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.SOCKET_RECONNECTION_FAILED,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the SOCKET_RECONNECTING action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.SOCKET_RECONNECTING,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });
});
