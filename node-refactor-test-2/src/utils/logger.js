// Logger configuration using pino
const pino = require('pino');
// const { NodeEnv } = require('./constants');

// Create a logging instance
const logger = pino({
  // level: process.env.NODE_ENV === NodeEnv.PROD ? 'info' : 'debug',
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

module.exports = logger;
