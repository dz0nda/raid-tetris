import 'regenerator-runtime/runtime';
import express from 'express';

import redTetris from './socket';

const app = express();
app.use(express.static('build'));

const server = require('http').createServer(app);

redTetris(server);

export default server;
