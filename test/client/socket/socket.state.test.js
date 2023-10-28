import 'regenerator-runtime/runtime';

import td from 'testdouble';

import ev from '../../../src/shared/events';

import store from '../../../src/client/store';

import { mockMiddleware, id, mockSocket, socketModule } from '../helpers/socketHelper';

socketModule.SOCKETS[id] = mockSocket;
socketModule.toggleInitStatus(id);

describe('# Socket Tests - State Events', () => {
  it('dispatches the CONNECT action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.CONNECT,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the CONNECT_ERROR action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.CONNECT_ERROR,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the CONNECT_TIMEOUT action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.CONNECT_TIMEOUT,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the DISCONNECT action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.DISCONNECT,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the RECONNECT action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.RECONNECT,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });
  it('dispatches the CONNECT_TIMEOUT action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.CONNECT_TIMEOUT,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the RECONNECT_ATTEMPT action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.RECONNECT_ATTEMPT,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the RECONNECT_ERROR action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.RECONNECT_ERROR,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the RECONNECT_FAILED action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.RECONNECT_FAILED,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches the RECONNECTING action', () => {
    td.replace(store, 'dispatch', jest.fn());

    mockMiddleware(store)(() => true)({
      type: `${id}_state`,
      payload: {
        type: ev.RECONNECTING,
      },
    });
    expect(store.dispatch).toHaveBeenCalled();
  });
});
