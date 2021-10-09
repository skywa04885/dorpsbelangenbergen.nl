import express from 'express';
import winston from 'winston';
import path from 'path';
import bodyParser from 'body-parser';

import { createSimpleLogger } from './logger';
import mainRoute from './routes/main.route';

const SERVER_BIND_ADDR: string = '0.0.0.0';
const SERVER_PORT: number = 80;
const VIEWS_PATH: string = path.join(process.cwd(), 'views');
const PUBLIC_PATH: string = path.join(process.cwd(), 'public');

// Creates the logger and other small things
const logger: winston.Logger = createSimpleLogger(path.basename(__filename));
logger.info(`Starting webserver on ${SERVER_BIND_ADDR}:${SERVER_PORT}`);

// Creates the express app and sets some basic
//  stuff like the static folder
const app: express.Application = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(PUBLIC_PATH));
app.set('views', VIEWS_PATH);
app.set('view engine', 'ejs');
app.set('view options', {
  rmWhitespace: true
});
logger.info(`Express is now configured {views: ${VIEWS_PATH}, public: ${PUBLIC_PATH}`);

// Binds the route
app.use('/', mainRoute);

// Listens the express http server on the specified
//  port and address, after which we log the status to the console
app.listen(SERVER_PORT, SERVER_BIND_ADDR, () => {
  logger.info(`Server listening on ${SERVER_BIND_ADDR}:${SERVER_PORT}`);
});