import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

import config from './config';
import apiRouter from './api';

const server = express();

server.use('/api', apiRouter);
server.use(express.static('public'));
server.use(
  sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public'),
  }),
);

server.set('view engine', 'ejs');

server.get('/', (req, res) => {
  res.render('index', {
    content: 'here is some content',
  });
});

server.listen(config.port, () => {
  console.info(`Express listening on port ${config.port}`);
});
