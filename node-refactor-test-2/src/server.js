require('module-alias/register'); // Register module aliases

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { ErrorHandling } = require('@utils/errors');
const { Constants, NodeEnv } = require('@utils/constants');
const mainRouter = require('./router');

const app = express();

// Set up request logger
if (Constants.NODE_ENV === NodeEnv.DEV) {
  app.use(morgan('tiny')); // Log requests only in development environments
}

// Set up request parsers
app.use(express.json()); // Parses application/json payloads request bodies
app.use(express.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded request bodies
app.use(cookieParser()); // Parse cookies

// Set up CORS
app.use(
  cors({
    origin: Constants.CORS_WHITELIST,
  }),
);

app.use('/api', mainRouter);

app.use(ErrorHandling);

module.exports = app;
