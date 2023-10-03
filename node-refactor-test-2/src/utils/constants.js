// Runtime environments
const NodeEnv = {
  DEV: 'development',
  TEST: 'test',
  PROD: 'production',
  JEST: 'jest',
};

// Logging levels
const LogLevel = {
  INFO: 'info',
  DEBUG: 'debug',
  WARN: 'warn',
  ERROR: 'error',
};

const Roles = {
  ROLE_EMPLOYEE: 'ROLE_EMPLOYEE',
  ROLE_ADMIN: 'ROLE_ADMIN',
};

// Environment variables, casting to correct type and setting default values for them.
class Constants {
  // Node runtime environment
  static NODE_ENV = process.env.NODE_ENV || NodeEnv.DEV;

  // Logging level
  static LOG_LEVEL = process.env.LOG_LEVEL || LogLevel.INFO;

  // Port to run the server in
  static PORT = process.env.PORT || '8080';

  // CORS urls to allow
  static CORS_WHITELIST = process.env.CORS_WHITELIST || '*';

  // Authentication secret
  // static TOKEN_SECRET = process.env.TOKEN_SECRET || 'secret';
}

module.exports = {
  NodeEnv,
  LogLevel,
  Constants,
  Roles,
};
