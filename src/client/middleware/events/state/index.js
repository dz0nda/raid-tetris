import connect from './connect';
import connectTimeout from './connectTimeout';
import connectError from './connectError';
import reconnect from './reconnect';
import reconnectAttempt from './reconnectAttempt';
import reconnecting from './reconnecting';
import reconnectError from './reconnectError';
import reconnectFailed from './reconnectFailed';
import disconnect from './disconnect';

export default [
  connect,
  connectTimeout,
  connectError,
  reconnect,
  reconnectAttempt,
  reconnecting,
  reconnectError,
  reconnectFailed,
  disconnect,
];
