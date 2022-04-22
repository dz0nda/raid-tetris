import params from '../shared/params';
import logger from './utils/logger';
import server from './index';

const { host, port } = params.server;

server.listen({ host, port }, () => {
  logger.info(`Listening on port ${port}!`);
});
