// import 'regenerator-runtime/runtime';
import express from 'express';

// import params from '../shared/params';
// import logger from './utils/logger';
import redTetris from './socket';

// const { host, port } = params.server;

const app = express();
app.use(express.static('build'));

const server = require('http').createServer(app);

redTetris(server);

// process.on('SIGTERM', () => {
//   server.close();
// });

// server.listen({ host, port }, () => {
//   logger.info(`Listening on port ${port}!`);
// });

export default server;
